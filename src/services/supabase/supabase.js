import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ntcczmjpcmfmtmpwqzvu.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const accessToken = sessionStorage.getItem("access_token"); // or from supabase.auth.getSession()
console.log("Token:", sessionStorage.getItem("access_token"));

// export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
