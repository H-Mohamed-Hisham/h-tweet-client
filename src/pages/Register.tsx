import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

// GraphQL
import { REGISTER_USER } from "graphql/mutations";

// Redux
import { setLogin, setToken } from "redux/userSlice";

// Component
import Heading from "components/common/Heading";
import Container from "components/common/Container";
import InputField from "components/form/InputField";

const Register = () => {
  // History
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();

  // State
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const [registerUser] = useMutation(REGISTER_USER, {
    update(_, { data: { login: userData } }) {
      const { token, ...rest } = userData;
      localStorage.setItem("h-tweet-token", userData.token);
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
    registerUser();
  };

  return (
    <Container>
      <div className="flex flex-col items-center">
        <Heading
          center
          title="Welcome"
          subtitle="Create your H-Tweet account"
        />
        <div className="w-full max-w-xs pt-10">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-4">
              <InputField
                id="username"
                label="Username"
                placeholder="Username"
                type="text"
                error={error}
                value={formValue.username}
                onChange={handleInputChange}
              />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="confirmPassword"
                error={error}
                value={formValue.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Already have a account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
