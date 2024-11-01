import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
