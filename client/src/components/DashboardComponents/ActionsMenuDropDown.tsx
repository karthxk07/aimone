import axios from "axios";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { Link } from "react-router";

export default () => {
  const [isAdmin, setIsAdmin]  = useState<boolean>(false);

   useEffect(()=>{
      axios.get("http://localhost:3001/api/auth/isAdmin").then((res)=>{
        console.log(res.data);
        setIsAdmin(res.data == 'admin' ? true : false);
      })
    },[])
  

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
            { isAdmin && 
              <li className="flex flex-row items-center cursor-pointer m-1 mx-5">
                <FaShield />
                &nbsp;
                <Link to="/admin/dashboard">Admin</Link>
              </li>
            }
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
