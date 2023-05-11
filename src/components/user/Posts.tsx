import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// GraphQL
import { FETCH_POSTS } from "graphql/queries";

// Component
import Banner from "components/common/Banner";
import PostCard from "components/post/PostCard";
import Alert from "components/common/Alert";
import PostCardSkeleton from "components/post/PostCardSkeleton";
import PostForm from "components/post/PostForm";

const Posts = () => {
  const { userId } = useParams<{ userId: string }>();

  // State
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any>([]);
  const [totalPosts, setTotalPosts] = useState(0);

  // Redux
  const { user } = useSelector((state: any) => state.user);

  const { error, fetchMore } = useQuery(FETCH_POSTS, {
    fetchPolicy: "network-only",
    skip: user === null,
    variables: {
      skip: 0,
      userId: userId,
    },
    onCompleted: (response) => {
      setPosts(response?.getPosts);
      setTotalPosts(parseInt(response?.getTotalPostCount));
      setLoading(false);
    },
  });

  // Handle Fetch More Posts
  function handleFetchMorePosts() {
    setLoading(true);
    fetchMore({
      variables: {
        skip: posts?.length,
        userId: user?.id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult) {
          setPosts([...posts, ...fetchMoreResult?.getPosts]);
          setLoading(false);
        }
      },
    });
  }

  return (
    <>
      <Banner title="Posts" isCenter={false} />

      {/* Post Form */}
      {userId === user?.id && (
        <div
          className="
      grid 
      grid-cols-1
      mb-10
      "
        >
          <PostForm userId={user.id} />
        </div>
      )}

      {/* Posts */}
      <div
        className="
            grid 
            grid-cols-1 
            gap-6
          "
      >
        {!loading && posts.length === 0 && (
          <Alert type="info" message={"No posts to display"} />
        )}

        {posts?.map((post: any, index: number) => (
          <PostCard key={index} post={post} isPostPage={false} />
        ))}

        {!loading && error && (
          <Alert type="error" message={error?.graphQLErrors[0]?.message} />
        )}

        {loading &&
          [1, 2, 3, 4].map((_, index) => <PostCardSkeleton key={index} />)}
      </div>

      {/* Load More */}
      <div
        className="
            flex 
            justify-center
            my-6
          "
      >
        {!loading && posts?.length < totalPosts ? (
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleFetchMorePosts}
          >
            Load More
          </button>
        ) : totalPosts > 0 ? (
          <p className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            You are up-to-date
          </p>
        ) : null}
      </div>
    </>
  );
};

export default Posts;
