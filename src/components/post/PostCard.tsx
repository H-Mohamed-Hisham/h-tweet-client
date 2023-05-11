import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Graphql
import { DELETE_POST } from "graphql/mutations";

// Component
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

// Interface
import { IPost } from "interfaces";

type props = {
  post: IPost;
  isPostPage: boolean;
};

const PostCard: React.FC<props> = ({ post, isPostPage }) => {
  // History
  const history = useHistory();

  const {
    id,
    likes,
    likeCount,
    body,
    createdAt,
    username,
    commentCount,
    // userId,
  } = post;

  // Redux
  const { user } = useSelector((state: any) => state.user);

  // Mutation
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: id,
    },
    update(_, result) {
      // toast(result?.data?.deletePost, {
      //   type: "success",
      // });
      history.push("/");
    },
    onError(err: any) {
      console.log("ERR :: ", err?.graphQLErrors[0]?.message);
      toast(err?.graphQLErrors[0]?.message, {
        type: "error",
      });
      // setError(err?.graphQLErrors[0]?.message);
    },
  });

  return (
    <figure className=" bg-white rounded-xl shadow-xl px-6 py-4">
      {/* Top Area */}
      <div className="flex items-start gap-x-3">
        {/* Profile Image */}
        <img
          className="w-16 h-16 rounded-full mx-auto"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width="384"
          height="512"
        />

        {/* Username  */}
        <figcaption className="font-medium grow">
          <Link to={`/profile/${user}`}>
            <div className="text-cyan-600">{username}</div>
          </Link>
          <div className="text-cyan-600 text-sm">
            {dayjs(createdAt.toString()).format("MMM D, YYYY h:mm A")}
          </div>
        </figcaption>

        {/* Dropdown */}
        {isPostPage && user !== null && user.username === username ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center p-2 text-sm font-semibold">
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-gray-100">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className="flex px-4 py-2 text-sm"
                        onClick={() => deletePost()}
                      >
                        <TrashIcon className="h-5 w-5 text-red-600" />{" "}
                        <span className="ml-2">Delete</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : null}
      </div>

      {/* Post Body Area */}
      {isPostPage ? (
        <div className="pt-6 space-y-4">
          <blockquote>
            <p className="text-sm font-semibold">{body}</p>
          </blockquote>
        </div>
      ) : (
        <Link to={`/post/${id}`}>
          <div className="pt-6 space-y-4">
            <blockquote>
              <p className="text-sm font-semibold">{body}</p>
            </blockquote>
          </div>
        </Link>
      )}

      {/* Like & Comment Area */}
      <div className="flex flex-wrap mb-6 text-sm mt-4 gap-2">
        {/* Like Button */}
        <LikeButton user={user} post={{ id, likes, likeCount }} />

        {/* Comment Button */}
        <CommentButton user={user} post={{ id, commentCount }} />
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </figure>
  );
};

export default PostCard;
