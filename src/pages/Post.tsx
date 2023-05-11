import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GraphQL
import { FETCH_POST } from "graphql/queries";

// Interface
import { IComment } from "interfaces";

// Component
import Container from "components/common/Container";
import Alert from "components/common/Alert";
import PostCardSkeleton from "components/post/PostCardSkeleton";
import PostCard from "components/post/PostCard";
import CommentCardSkeleton from "components/post/CommentCardSkeleton";
import CommentCard from "components/post/CommentCard";
import CommentForm from "components/post/CommentForm";
import GoBack from "components/common/GoBack";

const Post = () => {
  const { postId } = useParams<{ postId: string }>();

  const { loading, data, error } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-3 col-span-8">
          <GoBack link="/" title="Back to posts" />
          {loading ? (
            <>
              <PostCardSkeleton />
              {[1, 2].map((c: any, i: number) => (
                <CommentCardSkeleton key={i} />
              ))}
            </>
          ) : error ? (
            <Alert type="error" message={error?.graphQLErrors[0]?.message} />
          ) : data.getPost ? (
            <>
              <PostCard post={data?.getPost} isPostPage={true} />
              <CommentForm postId={postId} />
              {data?.getPost?.comments?.map(
                (comment: IComment, index: number) => (
                  <CommentCard
                    postId={data?.getPost?.id}
                    comment={comment}
                    key={index}
                  />
                )
              )}
            </>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default Post;
