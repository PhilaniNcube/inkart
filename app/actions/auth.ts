'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Define validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  redirectTo: z.string().optional(),
});

type LoginState = {
  error?: string;
  success?: boolean;
};

/**
 * Server action to handle user login
 */
export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // Parse and validate the form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    redirectTo: formData.get('redirectTo') || '/dashboard',
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0]?.message || 'Invalid form data',
      success: false,
    };
  }

  const { email, password, redirectTo } = validatedFields.data;
  

  const supabase = await createClient()

  // Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
      success: false,
    };
  }

  // Revalidate relevant paths after login
  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/cart');
  
  // If redirectTo is provided, redirect after successful login
  if (redirectTo) {
    redirect(redirectTo as string);
  }

  return {
    success: true,
  };
}

type LogoutState = {
  error?: string;
  success?: boolean;
};

/**
 * Server action to handle user logout
 */
export async function logout(
  prevState: LogoutState
): Promise<LogoutState> {

  const supabase = await createClient();

  // Sign out the user
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: error.message,
      success: false,
    };
  }

  // Revalidate relevant paths after logout
  revalidatePath('/');
  
  // Redirect to the home page after logout
  redirect('/');
}
