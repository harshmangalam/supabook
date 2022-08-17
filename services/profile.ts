import { supabase } from "../utils/supabaseClient";

export async function fetchProfileDetails(profileId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", profileId);

  if (error) throw error;

  if (data) return data[0];
}
