import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GraphQL
import { FETCH_USER } from "graphql/queries";

// Component

import ProfileLoader from "components/user/ProfileLoader";
import Alert from "components/common/Alert";
import ProfileCard from "components/user/ProfileCard";
import Banner from "components/common/Banner";

const ProfileView = () => {
  const { userId } = useParams<{ userId: string }>();

  const { loading, data, error } = useQuery(FETCH_USER, {
    variables: {
      userId: userId,
    },
  });

  return (
    <>
      <Banner title="Profile" isCenter={false} />

      {data && <ProfileCard userData={data?.getUser} />}

      {error && (
        <Alert type="error" message={error?.graphQLErrors[0]?.message} />
      )}

      {loading && <ProfileLoader />}
    </>
  );
};

export default ProfileView;
