import { useDispatch } from "react-redux";

// Redux
import { setLogout } from "redux/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
      onClick={() => {
        dispatch(setLogout());
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
