import { supabase } from "../utils/supabaseClient";

export async function fetchProfileDetails(profileId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", profileId);

  if (error) throw error;
  if (data) return data[0];
}

export async function changeProfilePic(profileId: string, avatar: any) {
  // fetch profile information from database
  const { data: profileData, error: profileErrr } = await supabase
    .from("profile")
    .select("avatar")
    .eq("id", profileId);
  if (profileErrr) throw profileErrr;

  // remove older avatar from supaabase storage
  if (profileData?.length && profileData[0].avatar) {
    const { error: avatarRemoveError } = await supabase.storage
      .from("avatar")
      .remove(profileData[0].avatar.path);

    if (avatarRemoveError) throw avatarRemoveError;

    // update profile data with new avatar
    const { data: updateProfileData, error: updateProfileError } =
      await supabase.from("profile").update({ avatar }).eq("id", profileId);

    if (updateProfileError) throw updateProfileError;
    if (updateProfileData) return updateProfileData[0];
  }
}
