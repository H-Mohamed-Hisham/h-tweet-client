import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

type props = {
  component: any;
  path: string;
};

const AuthRoute: React.FC<props> = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state: any) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
