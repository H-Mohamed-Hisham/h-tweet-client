import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

// GraphQL
import { LOGIN_USER } from "graphql/mutations";

// Redux
import { setLogin, setToken } from "redux/userSlice";

// Component
import Heading from "components/common/Heading";
import Container from "components/common/Container";
import InputField from "components/form/InputField";

const Login = () => {
  // History
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();

  // State
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<any>({});

  // Input Handler
  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormValue((prevProps) => ({
      ...prevProps,
      [id]: value,
    }));
  };

  // Mutation
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      const { token, ...rest } = userData;
      localStorage.setItem("h-tweet-token", token);
      dispatch(setLogin(rest));
      dispatch(setToken(token));
      history.push("/");
    },
    onError(err: any) {
      setError(err?.graphQLErrors[0]?.extensions.error);
    },
    variables: formValue,
  });

  // Form Submit
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <Container>
      <div className="flex flex-col items-center">
        <Heading
          center
          title="Welcome back"
          subtitle="Login to your account!"
        />
        <div className="w-full max-w-xs pt-10">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-4">
              <InputField
                id="email"
                label="Email"
                placeholder="Email"
                type="text"
                error={error}
                value={formValue.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <InputField
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                error={error}
                value={formValue.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link
                to="/forgot-password"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Already have an account?
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy; Design & Developed by Mohamed Hisham.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
