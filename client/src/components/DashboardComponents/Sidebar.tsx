import { FaTable } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GoNumber } from "react-icons/go";
import { MenuItems } from "../../enums/MenuItems";

const MenuItemsList = [
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
      <div>
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
                  <p>{item.itemName}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
