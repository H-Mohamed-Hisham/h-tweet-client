import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

// Graphql
import { LIKE_POST } from "graphql/mutations";

type props = {
  user: any;
  post: any;
};

const LikeButton: React.FC<props> = ({
  user,
  post: { id, likeCount, likes },
}) => {
  // History
  const history = useHistory();

  // State
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likeButton = liked ? (
    <HeartIconSolid
      className="text-red-500 h-6 w-6 cursor-pointer"
      onClick={() => (user !== null ? likePost() : history.push("/login"))}
    />
  ) : (
    <HeartIconOutline
      className="h-6 w-6 cursor-pointer"
      onClick={() => (user !== null ? likePost() : history.push("/login"))}
    />
  );

  useEffect(() => {
    if (
      user !== null &&
      likes.find((like: any) => like.username === user.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  return (
    <div className="flex flex-wrap items-center gap-2 border-2 p-2 rounded-lg divide-x-2">
      {likeButton}
      <div className="text-lg grow px-3">
        {likeCount}{" "}
        <span className="text-sm text-gray-500">
          {likeCount > 1 ? "Likes" : "Like"}
        </span>
      </div>
    </div>
  );
};

export default LikeButton;
