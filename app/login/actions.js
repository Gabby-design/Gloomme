'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}
