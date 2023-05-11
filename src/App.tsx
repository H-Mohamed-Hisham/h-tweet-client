import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Store
import store from "./store";

// Routes
import AuthRoute from "routes/AuthRoute";
import ProtectedRoute from "routes/ProtectRoute";

// Page
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Profile from "pages/Profile";
import Post from "pages/Post";
import ChangePassword from "pages/ChangePassword";

// Component
import Navbar from "components/navbar/Navbar";

// App CSS
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <main className="pt-36">
          <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <ProtectedRoute path="/profile/:userId" component={Profile} />
            <ProtectedRoute
              path="/change-password"
              component={ChangePassword}
            />
            <ProtectedRoute path="/post/:postId" component={Post} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
