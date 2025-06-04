import { FaTable } from "react-icons/fa";
import { AdminMenuItems } from "../../pages/AdminPages/AdminDashboard";

const AdminMenuItemsList = [
  { itemIcon: <FaTable />, itemName: "Update Timetable" },
];

export default ({ setSelectedView }: { setSelectedView: any }) => {
  const menuItemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    switch (e.currentTarget.id) {
      case "0":
        setSelectedView(AdminMenuItems.UPDATE_TIMETABLE);
        break;
    }
  };

  return (
    <>
      <div>
        <div className="m-5 font-sans">
          <ul>
            {AdminMenuItemsList.map((item, idx) => {
              return (
                <li
                  key={idx}
                  id={String(idx)}
                  className="cursor-pointer flex flex-row items-center bg-stone-200 rounded-2xl p-1 px-5 my-4 hover:bg-stone-300 text-stone-700"
                  onClick={menuItemClickHandler}
                >
                  {item.itemIcon}
                  &nbsp;&nbsp;
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
