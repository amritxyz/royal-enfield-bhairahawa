'use server';

import { revalidatePath } from 'next/cache';
import { motorcycles } from '@/lib/constants/motorcycles';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

export type BookTestRideState = {
  success: boolean;
  error?: string;
  field?: string;
};

type TestRideInsert = Database['public']['Tables']['test_rides']['Insert'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MISSING_COLUMN_PATTERN = /column|schema cache|could not find/i;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

function isPastDate(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${value}T00:00:00`) < today;
}

function composeLegacyNotes(input: {
  name: string;
  email: string;
  phone: string;
  time: string;
  notes: string;
}) {
  return [
    `Preferred time: ${input.time}`,
    `Rider: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    input.notes ? `Notes: ${input.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function bookTestRide(
  _prevState: BookTestRideState,
  formData: FormData
): Promise<BookTestRideState> {
  const motorcycleId = readString(formData, 'motorcycleId');
  const name = readString(formData, 'name');
  const email = readString(formData, 'email');
  const phone = readString(formData, 'phone');
  const preferredDate = readString(formData, 'preferredDate');
  const preferredTime = readString(formData, 'preferredTime');
  const notes = readString(formData, 'notes');

  if (!motorcycleId || !motorcycles.some((moto) => moto.id === motorcycleId)) {
    return { success: false, error: 'Please select a motorcycle.', field: 'motorcycleId' };
  }
  if (!name) {
    return { success: false, error: 'Please enter your name.', field: 'name' };
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { success: false, error: 'Please enter a valid email address.', field: 'email' };
  }
  if (!phone || phone.replace(/\D/g, '').length < 7) {
    return { success: false, error: 'Please enter a valid phone number.', field: 'phone' };
  }
  if (!preferredDate || !isValidDate(preferredDate)) {
    return { success: false, error: 'Please choose a preferred date.', field: 'preferredDate' };
  }
  if (isPastDate(preferredDate)) {
    return { success: false, error: 'Preferred date cannot be in the past.', field: 'preferredDate' };
  }
  if (!preferredTime) {
    return { success: false, error: 'Please choose a preferred time.', field: 'preferredTime' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to book a test ride.',
    };
  }

  const payload: TestRideInsert = {
    user_id: user.id,
    motorcycle_id: motorcycleId,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    rider_name: name,
    rider_email: email,
    rider_phone: phone,
    notes: notes || null,
    status: 'pending',
  };

  const { error } = await supabase.from('test_rides').insert(payload);

  if (error && MISSING_COLUMN_PATTERN.test(error.message)) {
    const { error: fallbackError } = await supabase.from('test_rides').insert({
      user_id: user.id,
      motorcycle_id: motorcycleId,
      preferred_date: preferredDate,
      notes: composeLegacyNotes({
        name,
        email,
        phone,
        time: preferredTime,
        notes,
      }),
      status: 'pending',
    });

    if (fallbackError) {
      return { success: false, error: fallbackError.message };
    }
  } else if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/account');
  revalidatePath('/book');
  revalidatePath(`/models/${motorcycleId}`);

  return { success: true };
}