import bcrypt from 'bcryptjs'
import { supabase } from '../lib/supabase'

const EMAIL_URL = "https://mefddbwmfnexhzkjdyix.supabase.co/functions/v1/send-welcome-email"

export default async function handleSignup({ name, email, phone_number, password, role, sport }) {
  // Step A: Hash the password
  console.log("🔐 Hashing password...")
  const password_hash = await bcrypt.hash(password, 10)

  // Step B: Insert into Supabase waitlist table
  console.log("📝 Inserting into waitlist...")
  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL)
  console.log("Supabase Key defined:", !!import.meta.env.VITE_SUPABASE_ANON_KEY)

  const { data: insertData, error } = await supabase
    .from('waitlist')
    .insert({ name, email, phone_number, password_hash, role, sport })
    .select()

  console.log("Insert result - data:", insertData, "error:", error)

  if (error) {
    console.error("❌ Supabase insert error:", error)
    if (error.code === '23505' || error.message.includes('duplicate')) {
      throw new Error('EMAIL_EXISTS')
    }
    throw new Error(error.message)
  }

  console.log("✅ Insert successful!")

  // Step C: ALWAYS call the welcome email Edge Function
  console.log("🔥 Attempting to call email function...")
  console.log("URL:", EMAIL_URL)

  try {
    const res = await fetch(EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })

    console.log("📡 Fetch completed, status:", res.status)

    const text = await res.text()
    console.log("📨 Raw response:", text)
  } catch (err) {
    console.error("❌ Fetch failed completely:", err)
  }

  // Step D: Return success
  return { success: true }
}
