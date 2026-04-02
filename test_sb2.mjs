import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const envRaw = fs.readFileSync('.env', 'utf-8')
const env = {}
envRaw.split('\n').filter(Boolean).forEach(line => {
  const idx = line.indexOf('=')
  if (idx !== -1) {
    env[line.slice(0, idx)] = line.slice(idx + 1).trim()
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const { data, error } = await supabase
    .from('waitlist')
    .insert({
      name: "Test2",
      email: `test${Date.now()}@gmail.com`,
      phone_number: "123",
      password_hash: "hash",
      role: "athlete",
      sport: "Test"
    })
    // REMOVED .select() here

  console.log("Data:", data)
  console.log("Error:", error?.message, error?.code, error?.details, error?.hint)
}
test()
