import { useEffect } from "react";
import ChangeEmailCard from "../components/ChangeEmailCard";
import PersonalDetailsCard from "../components/PersonalDetailsCard";
import ProfileImageCard from "../components/ProfileImageCard";
import { useMyProfileQuery } from "../redux/apis/profileApi";
import { showError } from "../utils/global";

const MyProfile = () => {
  const { data, error } = useMyProfileQuery();

  const user = data?.data;

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6 mb-2">
      <ProfileImageCard user={user} />
      <div className="flex justify-between gap-3">
        <PersonalDetailsCard user={user} />
        <ChangeEmailCard user={user} />
      </div>
    </div>
  );
};

export default MyProfile;
