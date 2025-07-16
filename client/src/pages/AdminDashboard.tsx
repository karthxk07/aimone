import { useState } from "react";
import Sidebar from "../components/AdminDashboardComponents/Sidebar";
import UpdateTimetable from "../views/AdminViews/UpdateTimetable";
import { AdminMenuItems } from "../enums";
import AddCourse from "../views/AdminViews/AddCourse";
import { FaUser } from "react-icons/fa";
import AddParticipants from "../views/AdminViews/AddParticipants";

const ActionsMenuDropDown = (): React.ReactNode => {
  return <></>;
};

export default () => {
  const [selectedView, setSelectedView] = useState<AdminMenuItems>(
    AdminMenuItems.UPDATE_TIMETABLE
  );
  const [isActionsMenuHovered, setActionsMenuHovered] = useState<boolean>();

  const renderView = (): React.ReactNode => {
    switch (selectedView) {
      case AdminMenuItems.UPDATE_TIMETABLE:
        return <UpdateTimetable />;
      case AdminMenuItems.ADD_COURSE:
        return <AddCourse />;
      case AdminMenuItems.ADD_PARTICIPANTS:
        return <AddParticipants />;
    }
  };

  return (
    <>
      <div className="flex flex-col font-mono h-screen overflow-hidden relative">
        {/* Topbar */}
        <div className="max-h-[5%] flex bg-gradient-to-r from-red-600  to-white p-3 px-5">
          <div className="flex-grow flex flex-row justify-center items-center  ">
            <img src="/logo.svg" alt="Logo" className="h-full " />{" "}
            <p className="font-bold text-2xl mx-3 text-indigo-800">
              AIM-<span className="text-white">One</span>
            </p>
          </div>
          <div
            className=" rounded-full aspect-square  flex justify-center items-center text-xl relative "
            onMouseEnter={() => {
              setActionsMenuHovered(true);
            }}
            onMouseLeave={() => {
              setActionsMenuHovered(false);
            }}
          >
            <FaUser />
            {isActionsMenuHovered && <ActionsMenuDropDown />}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-row max-h-screen h-screen overflow-clip ">
          <div className="w-[20&] bg-stone-100">
            <Sidebar setSelectedView={setSelectedView} />
          </div>
          <div className="flex-grow font-sans p-5">{renderView()}</div>
        </div>
      </div>
    </>
  );
};
