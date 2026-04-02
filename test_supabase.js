import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const { data, error } = await supabase
    .from('waitlist')
    .insert({
      name: "Test",
      email: "test.auth@gmail.com",
      phone_number: "123",
      password_hash: "hash",
      role: "athlete",
      sport: "Test"
    })
    .select()

  console.log("Data:", data)
  console.log("Error:", error)
}
test()
