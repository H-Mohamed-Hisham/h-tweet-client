import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// GraphQL
import { POST_COUNT } from "graphql/queries";

const StatView = () => {
  const { userId } = useParams<{ userId: string }>();

  const { loading, data, error } = useQuery(POST_COUNT, {
    variables: {
      userId: userId,
    },
  });

  return (
    <>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all mb-3 w-full shadow-xl">
        <div className="bg-white px-5 py-3">
          <div className="sm:flex sm:items-start">
            {!loading && (
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-sm leading-6 font-medium text-gray-400">
                  Total Posts
                </h3>
                <p className="text-3xl font-bold text-black">
                  {data
                    ? data?.getTotalPostCount
                    : error
                    ? error?.graphQLErrors[0]?.message
                    : null}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all mb-3 w-full shadow-xl">
        <div className="bg-white px-5 py-3">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
              <h3 className="text-sm leading-6 font-medium text-gray-400">
                Total Comments
              </h3>
              <p className="text-3xl font-bold text-black">71,897</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default StatView;
