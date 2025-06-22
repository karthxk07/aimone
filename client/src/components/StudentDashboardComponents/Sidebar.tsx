import { FaTable } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GoNumber } from "react-icons/go";
import { FaScroll } from "react-icons/fa6";
import { MenuItems } from "../../enums";

const MenuItemsList = [
  { itemIcon: <FaScroll />, itemName: "Announcements" },
  { itemIcon: <FaTable />, itemName: "Timetable" },
  { itemIcon: <SiGoogleclassroom />, itemName: "Attendence View" },
  { itemIcon: <GoNumber />, itemName: "Marks View" },
];

export default ({
  currentMenuStateHandler,
}: {
  currentMenuStateHandler: any;
}) => {
  //Handle Menu Item Click
  const menuItemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    switch (e.currentTarget.id) {
      case "0":
        currentMenuStateHandler(MenuItems.ANNOUNCEMENTS);
        break;
      case "1":
        currentMenuStateHandler(MenuItems.TIMETABLE);
        break;
      case "2":
        currentMenuStateHandler(MenuItems.ATTENDENCE);
        break;
      case "3":
        currentMenuStateHandler(MenuItems.MARKS);
        break;
    }
  };

  return (
    <>
      <div>
        <div className="m-5 font-sans">
          <ul>
            {MenuItemsList.map((item, idx) => {
              return (
                <li
                  key={idx}
                  id={String(idx)}
                  className="cursor-pointer flex flex-row items-center bg-stone-200 rounded-2xl p-1 px-5 my-4 hover:bg-stone-300 text-stone-700"
                  onClick={menuItemClickHandler}
                >
                  {item.itemIcon}
                  &nbsp;&nbsp;
                  <p >{item.itemName}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
