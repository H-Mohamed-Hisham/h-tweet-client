import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useMutation } from "@apollo/client";

// Graphql
import { DELETE_COMMENT } from "graphql/mutations";

// Interface
import { IComment } from "interfaces";

type props = {
  postId: string;
  comment: IComment;
};

const CommentCard: React.FC<props> = ({ postId, comment }) => {
  const { id, body, username, createdAt } = comment;

  // Redux
  const { user } = useSelector((state: any) => state.user);

  // Delete Comment
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: {
      postId,
      commentId: id,
    },
  });

  return (
    <figure className=" bg-white rounded-xl shadow-xl px-6 py-4 my-2">
      {/* Top Area */}
      <div className="flex items-start gap-x-3">
        {/* Profile Image */}
        <img
          className="w-8 h-8 rounded-full mx-auto"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width="384"
          height="512"
        />

        {/* Username  */}
        <figcaption className="grow">
          <div className="text-cyan-600 text-sm">{username}</div>
          <div className="text-cyan-600 text-sm">
            {dayjs(createdAt.toString()).format("MMM D, YYYY h:mm A")}
          </div>
        </figcaption>

        {/* Dropdown */}
        {user !== null && user.username === username ? (
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
                        onClick={() => deleteComment()}
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

      {/* Comment Body Area */}
      <div className="pt-6 space-y-4">
        <blockquote>
          <p className="text-sm font-semibold">{body}</p>
        </blockquote>
      </div>
    </figure>
  );
};

export default CommentCard;
