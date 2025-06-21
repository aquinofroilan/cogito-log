import { createClient as ssr } from "./server";
import { createClient as client } from "./client";

const supabaseClient = client;
const supabaseServerClient = ssr;
export { supabaseClient, supabaseServerClient };
