'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function login(formData) {
  try {
    const supabase = await createClient()

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      return { error: 'Could not authenticate user' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err) {
    return { error: 'An unexpected error occurred during login.' }
  }
}

export async function signup(formData) {
  try {
    const supabase = await createClient()

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
      return { error: error.message }
    }

    return { success: 'Please check your email to verify your account.' }
  } catch (err) {
    return { error: 'An unexpected error occurred during sign up.' }
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
