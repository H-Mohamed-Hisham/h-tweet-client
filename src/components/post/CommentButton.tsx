import { Link } from "react-router-dom";
import {
  ChatBubbleOvalLeftIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

type props = {
  user: any;
  post: any;
};

const CommentButton: React.FC<props> = ({
  user,
  post: { id, commentCount },
}) => {
  const commentButton =
    commentCount > 0 ? (
      <Link to={user !== null ? `/post/${id}` : `/login`}>
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
      </Link>
    ) : (
      <Link to={user !== null ? `/post/${id}` : `/login`}>
        <ChatBubbleOvalLeftIcon className="h-6 w-6" />
      </Link>
    );

  return (
    <div className="flex flex-wrap items-center gap-2 border-2 p-2 rounded-lg divide-x-2">
      {commentButton}
      <div className="text-lg grow px-3">
        {commentCount}{" "}
        <span className="text-sm text-gray-500">
          {commentCount > 1 ? "Comments" : "Comment"}
        </span>
      </div>
    </div>
  );
};

export default CommentButton;
