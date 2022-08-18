import { supabase } from "../utils/supabaseClient";

export async function fetchFriendRequestSent(profileId: string) {
  const { data, error } = await supabase
    .from("friend_request")
    .select("*")
    .eq("from", profileId);

  if (error) throw error;
  if (data) return data;
}
