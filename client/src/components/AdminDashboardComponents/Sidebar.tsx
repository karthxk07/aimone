import { FaTable, FaBook, FaPlus } from "react-icons/fa";
import { AdminMenuItems } from "../../enums";

const AdminMenuItemsList = [
  {
    itemIcon: <FaTable />,
    itemName: "Update Timetable",
    itemKey: AdminMenuItems.UPDATE_TIMETABLE,
  },
  {
    itemIcon: <FaBook />,
    itemName: "Course",
    subItems: [
      {
        itemIcon: <FaPlus />,
        itemName: "Add Course",
        itemKey: AdminMenuItems.ADD_COURSE,
      },
    ],
  },
];

export default ({ setSelectedView }: { setSelectedView: any }) => {
  const menuItemClickHandler = (key: number) => {
    setSelectedView(key);
  };

  return (
    <div className="m-5 font-sans">
      <ul>
        {AdminMenuItemsList.map((item, idx) => (
          <li key={idx}>
            <div className="cursor-default flex flex-row items-center bg-stone-200 rounded-2xl p-1 px-5 my-4 text-stone-700">
              {item.itemIcon}
              &nbsp;&nbsp;
              <p>{item.itemName}</p>
            </div>

            {/* Render sub-items if any */}
            {item.subItems && (
              <ul className="ml-8 mt-2">
                {item.subItems.map((subItem, subIdx) => (
                  <li
                    key={`${idx}-${subIdx}`}
                    className="cursor-pointer flex flex-row items-center bg-stone-200 rounded-2xl p-1 px-5 my-2 hover:bg-stone-300 text-stone-600"
                    onClick={() => menuItemClickHandler(subItem.itemKey)}
                  >
                    {subItem.itemIcon}
                    &nbsp;&nbsp;
                    <p>{subItem.itemName}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
