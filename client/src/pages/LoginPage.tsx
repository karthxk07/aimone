import axios from "axios";
import {Announcement} from "../types/types";
import ReactMarkdown from "react-markdown";
import { FaBullseye } from "react-icons/fa";

//add different login for faculty and student , and on faculty login check if the faculty is admin or academic and then accordingly show the dashboard

function LoginPage() {
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    //send request to /api/auth/login
    //todo : change this to just the path name later
    axios
      .post("http://localhost:3001/api/auth/login", {
        email,
        password,
      })
      .then(() => {
        window.location.pathname = "/dashboard";
      });
  };

  //replace with announcements api call
  let announcements: Announcement[] = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: undefined,
    },
  ];

  return (
    <>
      <div className="h-screen flex flex-col font-mono ">
        <div
          id="masthead"
          className="min-h-[20%] bg-gradient-to-r from-red-700 via-red-600 to-white flex flex-row "
        >
          <div className="flex-grow flex items-center ml-20 ">
            <img src="./logo_big.png" alt="Logo" />
            <p className="text-2xl font-bold text-white ml-3">
              AIMOne - AIMK's common platform
            </p>
          </div>
          <div className="flex items-center">
            <form
              className="flex-row mx-5"
              id="login_form"
              onSubmit={loginHandler}
            >
              <label
                htmlFor="email_input"
                className="font-semibold text-indigo-800"
              >
                Email:
              </label>
              <input
                type="text"
                id="email_input"
                name="email"
                className="bg-white mr-4 rounded-lg px-2  focus:outline-none text-sm text-stone-800"
                placeholder="Email"
              />
              <label
                htmlFor="password_input"
                className="font-semibold text-indigo-800"
              >
                Password:
              </label>
              <input
                type="text"
                id="password_input"
                name="password"
                className="bg-white mr-4 rounded-lg px-2  focus:outline-none text-sm text-stone-800"
                placeholder="Password"
              />
              <input
                type="submit"
                value="Login"
                className="text-white px-3 py-1 rounded-lg cursor-pointer bg-red-800 font-extrabold"
              />
            </form>
          </div>
        </div>
        <div id="body" className="flex-grow flex flex-row">
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-[70%] h-[80%] bg-stone-50 rounded-lg flex flex-col">
              <p className="m-5 font-semibold text-lg">Announcements </p>
              <ul className="mx-7 mb-5 overflow-y-scroll flex-grow text-sm  flex flex-col gap-y-6">
                {announcements.map(
                  (announcement: Announcement, idx: number) => (
                    <li
                      key={idx}
                      className="border-b-[1px] border-b-stone-200 flex items-center pb-2 px-2 "
                    ><FaBullseye/>
                      <a href={announcement.link} className="ml-3">
                        <ReactMarkdown>{announcement.text}</ReactMarkdown>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-1/2 justify-center ">
            <div>
              <img src="./logo.svg" alt="Logo_big" className="my-4" />
            </div>
            <p className="text-6xl font-sans font-semibold mr-80">
              Welcome to <span className="text-red-700">Army Institute of</span>
              <span className="text-indigo-800"> Management</span>, Kolkata
            </p>
          </div>
        </div>
        <div
          id="footnote"
          className="min-h-[15%] bg-stone-100 flex flex-row font-sans text-stone-500"
        >
          <div className="flex flex-col my-2 px-5 border-r-2  ">
            <p className="text-sm font-bold">Socials</p>
            <ul className="list-inside m-3  ml-10  text-xs flex flex-col gap-1">
              <li className="cursor-pointer">Facebook</li>
              <li>Linkedin</li>
              <li>Twitter</li>
              <li>Youtube</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className="flex flex-col my-2 px-5 border-r-2 ">
            <p className="text-sm font-bold">Contacts</p>
            <ul className="list-inside m-3  ml-10  text-xs flex flex-row gap-5">
              <li>
                Admission Cell Dr. Ayan Chattopadhyay Contact No.:
                +91-9830898046
              </li>
              <li>
                Dr. Abhishek Bhattacharjee Contact No.: +91-7980010533 Email:
                admission_cell@aim.ac.in
              </li>
              <li>
                Head Placement and Corporate Relations Prof. Tamojit Ghosh Roy
                Contact No.: +91 9819774744 Email: placement_cell@aim.ac.in
              </li>
            </ul>
          </div>
          <div className="flex flex-col m-5 justify-center w-2/6  ">
            <div className="flex items-center">
              <img src="./logo.svg" alt="Logo" className="scale-[60%]" />
              <p className="font-bold text-xl ml-5">
                AIM One - One portal for AIMK
              </p>
            </div>
            <p className="text-xs text-right">Developed by Karthik</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
