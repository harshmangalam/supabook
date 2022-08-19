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
    .from("friend")
    .select("to(id,name,avatar)")
    .eq("from", profileId);

  if (error) throw error;
  if (data) return data?.map((user) => user.to);
}

export async function sendFriendRequest(from: string, to: string) {
  if (from === to)
    throw new Error("You cannot send friend request to yourself");
  const { data: userData, error: userError } = await supabase
    .from("friend")
    .select("id")
    .match({
      from,
      to,
    });

  if (userError) throw userError;
  if (userData?.length) throw new Error("Friend request already sent");

  const { data, error } = await supabase.from("friend").insert({ from, to });

  if (error) throw error;
  if (data) return data;
}

export async function cancelFriendRequest(from: string, to: string) {
  const { data, error } = await supabase.from("friend").delete().match({
    from,
    to,
  });

  if (error) throw error;
  if (data) return data;
}

export async function fetchFriendRequestReceived(profileId: string) {
  const { data, error } = await supabase
    .from("friend")
    .select("from(id,name,avatar)")
    .match({
      isFriend: false,
      to: profileId,
    });
  if (error) throw error;
  if (data) return data?.map((user) => user.from);
}

export async function ignoreFriendRequest(from: string, to: string) {
  const { data, error } = await supabase.from("friend").delete().match({
    from,
    to,
  });

  console.log(from, to);

  if (error) throw error;
  if (data) return data;
}

export async function acceptFriendRequest(from: string, to: string) {
  const { data, error } = await supabase
    .from("friend")
    .update({
      isFriend: true,
    })
    .match({
      from,
      to,
    });

  if (error) throw error;
  if (data) return data;
}

export async function fetchMyFriend(profileId: string) {
  const { data, error } = await supabase
    .from("friend")
    .select("*, from(id,name,avatar),to(id,name,avatar)")
    .eq("isFriend", true);
  if (error) throw error;
  if (data)
    return data
      ?.filter((user) => user.from.id === profileId || user.to.id === profileId)
      .map((user) => {
        if (profileId === user.to.id) {
          return user.from;
        } else {
          return user.to;
        }
      });
}

export async function unfriend(from: string, to: string) {
  const { data: data1, error: error1 } = await supabase
    .from("friend")
    .delete()
    .match({
      from,
      to,
      isFriend: true,
    });

  if (error1) throw error1;

  if (data1) {
    if (data1.length === 0) {
      const { data: data2, error: error2 } = await supabase
        .from("friend")
        .delete()
        .match({
          from: to,
          to: from,
          isFriend: true,
        });

      if (error2) throw error2;
      return data2;
    }
    return data1;
  }
}
