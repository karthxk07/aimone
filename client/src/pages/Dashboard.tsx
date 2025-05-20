import { ReactNode, useState } from "react";
import { MenuItems } from "../enums/MenuItems";
import TimeTableView from "../views/TimeTableView";
import AttendenceView from "../views/AttendenceView";
import MarksView from "../views/MarksView";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/DashboardComponents/Sidebar";
import { FaScroll, FaUser } from "react-icons/fa";
import ActionsMenuDropDown from "../components/DashboardComponents/ActionsMenuDropDown";
import Announcement from "../types/types";



export default () => {
  const [selectedView, setSelectedView] = useState<MenuItems>();
  const [isActionsMenuHovered, setActionsMenuHovered] =
    useState<boolean>(false);

  //Conditionally render the active view
  const renderView = (): ReactNode => {
    switch (selectedView) {
      case MenuItems.ATTENDENCE:
        return <AttendenceView />;
      case MenuItems.TIMETABLE:
        return <TimeTableView />;
      case MenuItems.MARKS:
        return <MarksView />;
    }
  };

  //replace with api call
  let announcements: Announcement[] = [
    {
      text: "**[Important]** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: undefined,
    },
  ];

  return (
    <>
      <div className="flex flex-col font-mono h-screen overflow-hidden relative">
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
            {isActionsMenuHovered && <ActionsMenuDropDown /> }
          </div>
        </div>
        <div className="flex-grow flex flex-row ">
          <div id="sidebar" className="bg-stone-300 ">
            <Sidebar currentMenuStateHandler={setSelectedView} />
          </div>
          <div className="flex flex-grow font-sans p-5">
            {selectedView ? (
              renderView()
            ) : (
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center gap-1 text-2xl">
                  <FaScroll /> <p>Announcements</p>
                </div>
                {/* Implement fetching announcements */}
                <div className="m-3">
                  {" "}
                  <ul className="ml-8 list-disc">
                    {announcements.map(
                      (announcement: Announcement, idx: number) => (
                        <li key={idx} className="bg-stone-50 p-3 rounded-2xl ">
                          <a href={announcement.link}>
                            <ReactMarkdown>{announcement.text}</ReactMarkdown>
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
