import { useState } from "react";
import { useQuery } from "@apollo/client";

// GraphQL
import { FETCH_POSTS } from "graphql/queries";

// Component
import Container from "components/common/Container";
import PostCard from "components/post/PostCard";
import Alert from "components/common/Alert";
import PostCardSkeleton from "components/post/PostCardSkeleton";
import PostForm from "components/post/PostForm";

const Home = () => {
  // State
  const [totalPosts, setTotalPosts] = useState(0);

  const { loading, data, error, fetchMore } = useQuery(FETCH_POSTS, {
    variables: {
      skip: 0,
      userId: null,
    },
    fetchPolicy: "network-only",
    onCompleted: (response) => {
      setTotalPosts(parseInt(response?.getTotalPostCount));
    },
  });

  // Handle Fetch More Posts
  function handleFetchMorePosts() {
    fetchMore({
      variables: {
        skip: data?.getPosts?.length,
        userId: null,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts],
        });
      },
    });
  }

  return (
    <Container>
      {/* Post Form */}
      <div
        className="
            grid 
            grid-cols-1
            mb-10
          "
      >
        <PostForm userId={null} />
      </div>

      {/* Posts */}
      <div
        className="
            grid 
            grid-cols-1 
            gap-8
          "
      >
        {!loading && data && data?.getPosts?.length === 0 && (
          <Alert type="info" message={"No posts to display"} />
        )}

        {data &&
          data?.getPosts?.map((post: any, index: number) => (
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
        {!loading && data?.getPosts?.length < totalPosts ? (
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
    </Container>
  );
};

export default Home;
