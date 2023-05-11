const CommentCardSkeleton = () => {
  return (
    <figure className="bg-white rounded-xl p-8 my-2">
      <div className="animate-pulse flex items-center gap-x-3">
        <div className="rounded-full bg-gray-200 h-8 w-8"></div>
        <div className="grow">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="animate-pulse pt-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </figure>
  );
};

export default CommentCardSkeleton;
