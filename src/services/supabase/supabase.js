import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ntcczmjpcmfmtmpwqzvu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50Y2N6bWpwY21mbXRtcHdxenZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MDY4OTMsImV4cCI6MjA2NjA4Mjg5M30.v1gOw9zx8h0s3dmBKW_E_MlMjNZt99lrUBp9AWHL7F8";
export const supabase = createClient(supabaseUrl, supabaseKey);
