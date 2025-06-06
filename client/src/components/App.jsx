import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./AuthLayout.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { Provider } from "react-redux";
import appStore from "../utils/appStore.js";
import Body from "./Body.jsx";
import Feed from "./feed.jsx";
import Profile from "./Profile.jsx";
import Connections from "./Connections.jsx";
import RequestReceived from "./RequestsReceived.jsx";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/feed" index element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<RequestReceived />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
