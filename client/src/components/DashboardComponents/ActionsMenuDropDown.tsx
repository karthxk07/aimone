import axios from "axios";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";

export default () => {
  const signOutHandler = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    //todo : change this with just the path name for prod
    await axios.get("http://localhost:3001/api/auth/signout").then(() => {
      window.location.pathname = "/login";
    });
  };
  return (
    <>
      <div className="absolute top-full -end-3.5">
        <div className="m-2 bg-stone-100 text-base rounded-lg py-1  ">
          <ul>
            <li className="flex flex-row items-center cursor-pointer m-1 mx-5">
              <FaUserEdit />
              &nbsp;Profile
            </li>
            <hr />
            <li
              className="flex flex-row items-center cursor-pointer m-1 mx-5"
              onClick={signOutHandler}
            >
              <FaSignOutAlt />
              &nbsp;Signout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
