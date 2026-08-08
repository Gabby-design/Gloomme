'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../utils/supabase/server'

const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000'
  
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  
  // Remove trailing slash if present
  url = url.replace(/\/+$/, '')
  return url
}

export async function loginAction(formData) {
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

export async function signUpAction(formData) {
  try {
    const supabase = await createClient()

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${getURL()}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: 'Please check your email to verify your account.' }
  } catch (err) {
    return { error: 'An unexpected error occurred during sign up.' }
  }
}
