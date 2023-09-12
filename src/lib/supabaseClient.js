import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const options = {
  auth: {
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? window.localStorage : null,
  },
};

const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export default supabase;
