'use server';

import { createClient } from '@/lib/supabase/server';
import { LoginFormData, RegisterFormData } from '../types';

export async function login(data: LoginFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    // Return a generic error to avoid account enumeration
    return { error: 'Invalid email or password.' };
  }

  // Success: no error
  return { error: null };
}

export async function register(data: RegisterFormData) {
  const supabase = await createClient();

  // Basic server-side password policy
  const password = (data.password || '').trim();
  const isLongEnough = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigitOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>\-_[\]`~;'/+\\=]/.test(password);
  if (!isLongEnough || !hasUpper || !hasLower || !hasDigitOrSymbol) {
    return { error: 'Password must be 8+ chars and include upper, lower, and a number or symbol.' };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  if (error) {
    // Hide detailed errors from end users
    return { error: 'Registration failed. Please try again.' };
  }

  // Success: depending on Supabase settings, email verification may be required
  // We do not expose session state here; the UI should direct users accordingly
  return { error: null };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
