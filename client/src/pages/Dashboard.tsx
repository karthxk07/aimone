
import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MenuItems } from "../enums/MenuItems";
import TimeTableView from "../views/TimeTableView";
import AttendenceView from "../views/AttendenceView";
import MarksView from "../views/MarksView";


export default ()=>{

    const [selectedView,setSelectedView] = useState<MenuItems>();

    //Conditionally render the active view
    const renderView = () : ReactNode=>{
        switch(selectedView) {
            case MenuItems.ATTENDENCE:
                return <AttendenceView/>;
            case MenuItems.TIMETABLE:
                return <TimeTableView/>;
            case MenuItems.MARKS:
                return <MarksView/>;
        }
    }

    return (

        <>
        <div className="h-screen flex flex-row">
            <div id="sidebar" className="bg-stone-300 ">
                <Sidebar currentMenuStateHandler={setSelectedView} />
            </div>
            <div className="flex flex-grow">
                {renderView()}
            </div>

            
        </div>
        
        </>
    )
}