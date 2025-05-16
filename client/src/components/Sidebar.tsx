import { useState } from "react";
import { MenuItems } from "../enums/MenuItems";
import { FaTable } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GoNumber } from "react-icons/go";


const MenuItemsList = [
  { itemIcon: <FaTable />, itemName: "Timetable" },
  { itemIcon: <SiGoogleclassroom />, itemName: "Attendence View" },
  { itemIcon: <GoNumber/>,itemName: "Marks View" },
];

export default ({
  currentMenuStateHandler,
}: {
  currentMenuStateHandler: any;
}) => {
  const [collapseSidebar, setCollapseSidebar] = useState<boolean>(false);

  //Handle Sidebar Collapse Button click
  const collapseSidebarHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCollapseSidebar(!collapseSidebar);
  };

  //Handle Menu Item Click
  const menuItemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    switch (e.currentTarget.id) {
      case "0":
        currentMenuStateHandler(MenuItems.TIMETABLE);
        break;
      case "1":
        currentMenuStateHandler(MenuItems.ATTENDENCE);
        break;
      case "2":
        currentMenuStateHandler(MenuItems.MARKS);
        break;
    }
  };

  return (
    <>
      <button onClick={collapseSidebarHandler}>Collapse</button>
      <div className="m-5">
        <ul>
          {MenuItemsList.map((item, idx) => {
            return (
              <li
                key={idx}
                id={String(idx)}
                className="cursor-pointer flex flex-row"
                onClick={menuItemClickHandler}
              >
                {item.itemIcon}
                <p className={`${collapseSidebar && `hidden`}`}>
                  {item.itemName}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
