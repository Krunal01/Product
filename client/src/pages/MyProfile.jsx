import ChangeEmailCard from "../components/ChangeEmailCard";
import PersonalDetailsCard from "../components/PersonalDetailsCard";
import ProfileImageCard from "../components/ProfileImageCard";
import { useMyProfileQuery } from "../redux/apis/profileApi";

const MyProfile = () => {
  const { data } = useMyProfileQuery();

  const user = data?.data;
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
