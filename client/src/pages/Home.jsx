import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/global";
import Btn from "../components/Btn";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-1 p-1">
        Home
        <Btn
          title="My Profile"
          className="bg-sky-400"
          onClick={() => navigate("/my-profile")}
        />
        <Btn title="Logout" onClick={() => handleLogout()} />
      </div>
    </div>
  );
};

export default Home;
