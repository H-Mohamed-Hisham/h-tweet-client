// Component
import Container from "components/common/Container";
import ProfileView from "components/user/ProfileView";
import StatView from "components/user/StatView";
import Posts from "components/user/Posts";

const Profile = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-4">
        {/* Profile & Stat */}
        <div className="lg:col-span-1 col-span-3">
          <ProfileView />
          <StatView />
        </div>

        {/* Posts */}
        <div className="lg:col-span-2 col-span-3">
          <Posts />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
