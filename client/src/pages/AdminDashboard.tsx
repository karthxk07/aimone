import { useState } from "react";
import Sidebar from "../components/AdminDashboardComponents/Sidebar";
import UpdateTimetable from "../views/AdminViews/UpdateTimetable";
import { AdminMenuItems } from "../enums";


export default () => {
  const [selectedView, setSelectedView] = useState<AdminMenuItems>(AdminMenuItems.UPDATE_TIMETABLE);

  const renderView = (): React.ReactNode => {
    switch (selectedView) {
      case AdminMenuItems.UPDATE_TIMETABLE:
        return <UpdateTimetable />;
    }
  };

  return (
    <>
      <div className="flex flex-row max-h-screen h-screen overflow-clip ">
        <div className="w-[20&] bg-stone-100">
          <Sidebar setSelectedView={setSelectedView} />
        </div>
        <div>

        {renderView()}
        </div>
      </div>
    </>
  );
};
