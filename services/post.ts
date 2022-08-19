import { supabase } from "../utils/supabaseClient";

export async function fetchUserPosts(profileId: string) {
  const { data, error } = await supabase
    .from("post")
    .select(`*,author(id,name,avatar)`)
    .eq("author", profileId);

  console.log(data);
  if (error) throw error;
  if (data) return data;
}
