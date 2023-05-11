import dayjs from "dayjs";

// Interface
import { IUser } from "interfaces";

type props = {
  userData: IUser;
};

const ProfileCard: React.FC<props> = ({ userData }) => {
  const { email, username, updatedAt, createdAt } = userData;

  return (
    <figure className=" bg-white rounded-xl shadow-xl px-6 py-4 mb-5">
      {/* Top Area */}
      <div className="flex items-center gap-x-3 flex-wrap mb-4">
        {/* Profile Image */}
        <img
          className="w-16 h-16 rounded-full mx-auto"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width="384"
          height="512"
        />

        {/* Username  */}
        <figcaption className="font-medium grow max-sm:text-center">
          <div className="text-cyan-600">{username}</div>
        </figcaption>
      </div>

      {/* User Description Area */}
      <dl className="divide-y divide-gray-100 break-words">
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Username
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {username}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {email}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Account Created At
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {dayjs(createdAt.toString()).format("MMM D, YYYY h:mm A")}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Last Updated At
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {dayjs(updatedAt.toString()).format("MMM D, YYYY h:mm A")}
          </dd>
        </div>
      </dl>
    </figure>
  );
};

export default ProfileCard;
