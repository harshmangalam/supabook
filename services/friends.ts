import { supabase } from "../utils/supabaseClient";

export async function fetchFriendSuggestion() {
  const { data, error } = await supabase
    .from("profile")
    .select("id,avatar,name");

  if (error) throw error;
  if (data) return data;
}

export async function fetchFriendRequestSent(profileId: string) {
  const { data, error } = await supabase
    .from("friend_request")
    .select("to(id,name,avatar)")
    .eq("from", profileId);

  if (error) throw error;
  if (data) return data?.map((user) => user.to);
}

export async function sendFriendRequest(from: string, to: string) {
  if (from === to)
    throw new Error("You cannot send friend request to yourself");
  const { data: userData, error: userError } = await supabase
    .from("friend_request")
    .select("id")
    .match({
      from,
      to,
    });

  if (userError) throw userError;
  if (userData?.length) throw new Error("Friend request already sent");

  const { data, error } = await supabase
    .from("friend_request")
    .insert({ from, to });

  if (error) throw error;
  if (data) return data;
}

export async function cancelFriendRequest(from: string, to: string) {
  console.log(from, to);
  const { data, error } = await supabase.from("friend_request").delete().match({
    from,
    to,
  });

  if (error) throw error;
  if (data) return data;
}
