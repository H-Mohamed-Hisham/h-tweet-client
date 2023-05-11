const ProfileLoader = () => {
  return (
    <figure className="bg-white rounded-xl p-8 mb-5">
      <div className="animate-pulse flex items-center gap-x-3">
        <div className="rounded-full bg-gray-200 h-20 w-20"></div>
        <div className="grow">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="animate-pulse pt-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </figure>
  );
};

export default ProfileLoader;
