import { useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";

// CSS
import "react-toastify/dist/ReactToastify.css";

// GraphQL
import { CHANGE_PASSWORD } from "graphql/mutations";

// Component
import Container from "components/common/Container";
import Heading from "components/common/Heading";
import InputField from "components/form/InputField";

const ChangePassword = () => {
  // Redux
  const { user } = useSelector((state: any) => state.user);

  // State
  const [formValue, setFormValue] = useState({
    currentPassword: "",
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
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    update(_, { data: { changePassword } }) {
      setError({});
      setFormValue({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
      toast("Successfully updated the password", {
        type: "success",
      });
    },
    onError(err: any) {
      setError(err?.graphQLErrors[0]?.extensions.error);

      toast("Form Validation Error", {
        type: "error",
      });
    },
    variables: formValue,
  });

  // Form Submit
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    changePassword();
  };

  return (
    <Container>
      <div className="flex flex-col items-center">
        <Heading
          center
          title={`Hello, ${user.username}`}
          subtitle="Manage your password"
        />

        <div className="w-full max-w-xs pt-10">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-6">
              <InputField
                id="currentPassword"
                label="Current Password"
                placeholder="Current Password"
                type="password"
                error={error}
                value={formValue.currentPassword}
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

            <div className="mb-6">
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
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
                Change
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default ChangePassword;
