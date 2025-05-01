import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";
const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
