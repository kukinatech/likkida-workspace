import { createClient } from "@supabase/supabase-js";
import config from "../configs/index.js";
import type { Database } from "../types/supabase.js";


export default createClient<Database>(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
);