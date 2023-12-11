import React from "react";
import { BottomBar, Notification } from "../components";
import { LiaLessThanSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function Notifications() {
  return (
    <>
      <nav className="p-4">
        <div className="flex items-center w-[60vw] justify-between">
          <div>
            <Link to={"/home"}>
              <LiaLessThanSolid size={20} color="black" />
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
        </div>
      </nav>
      <Notification />
      <BottomBar />
    </>
  );
}
