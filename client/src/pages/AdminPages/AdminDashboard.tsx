import { useState } from "react";
import Sidebar from "../../components/AdminDashboardComponents/Sidebar";
import UpdateTimetable from "./UpdateTimetable";

export enum AdminMenuItems {
  UPDATE_TIMETABLE,
  
}

export default () => {
  const [selectedView, setSelectedView] = useState<AdminMenuItems>(0);

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
