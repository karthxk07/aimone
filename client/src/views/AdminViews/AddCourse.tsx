import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaBuffer } from "react-icons/fa";
import { Slots } from "../../enums";

interface Faculty {
  id: string;
  name: string;
  emp_id: string;
}

// page to add a  course
export default () => {
  //states
  const [faculty_list, setFacultyList] = useState<[Faculty] | []>([]);
  const [facultySelectDropDown, setFacultySelectDropDown] =
    useState<boolean>(false);
  //states for all form entries

  //refs
  const class_no_ref = useRef<HTMLInputElement | null>(null);

  //auto generate class no func
  const gen_class_no = () => {
    //generate a class number
    const class_no = "CH" + Date.now().toString(); //timestamp

    if (class_no_ref.current) class_no_ref.current.value = class_no;
  };
  useEffect(() => {
    gen_class_no();
  }, []);

  //faculty search query handler
  const handleFacultySearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = e.target.value;

    //if search query empty, return
    if (!query) {
      setFacultyList([]);
      return;
    }

    //get the faculty list from the query
    axios
      .get("http://localhost:3001/api/admin/user_util/facultiesByEmpId", {
        params: {
          query,
        },
      })
      .then((facultyList: unknown) => {
        setFacultyList(facultyList as [Faculty]);
      });
    // simulate dummy list
    const dummy_list = [
      { id: "123", emp_id: "123", name: "karthik" },
      { id: "123", emp_id: "123", name: "karthik" },
    ];
    setFacultyList(dummy_list as [Faculty]);
  };


  //add course handler
  const addCourseHandler = (e:React.FormEvent)=>{
    //get data from form entries state
  }

  return (
    <>
      <div className="h-full w-full flex flex-col">
        <p className="text-2xl inline-flex gap-1">
          <FaBuffer />
          Add Course
        </p>

        <div className="flex-grow w-full flex justify-center ">
          <div className="bg-stone-100/70 rounded-xl p-5 h-fit">
            <form className="flex flex-col" onSubmit={addCourseHandler}>
              {/* [*]-Completed []-Todo */}
              {/* Class no [*] */}
              <div className="mb-4 flex justify-between items-center ">
                <label
                  htmlFor="class_no"
                  className="text-sm text-stone-800 mr-4 font-semibold"
                >
                  Class no :{" "}
                </label>
                <input
                  type="text"
                  id="class_no"
                  name="class_no"
                  disabled
                  className="bg-stone-200 text-stone-500 text-sm rounded-2xl px-3 py-2 placeholder:text-sm focus:outline-0"
                  ref={class_no_ref}
                />
              </div>
              {/* Course Title [*]*/}
              <div className="mb-4 flex justify-between items-center  ">
                <label
                  htmlFor="course_title"
                  className="text-sm text-stone-800 mr-4 font-semibold"
                >
                  Course Name :{" "}
                </label>
                <input
                  type="text"
                  id="course_title"
                  name="course_title"
                  className="bg-white rounded-2xl px-3 py-2 placeholder:text-sm focus:outline-0"
                  placeholder="enter a course name.."
                />
              </div>
              {/* Course Code [*]*/}
              <div className="mb-4 flex justify-between items-center  ">
                <label
                  htmlFor="course_code"
                  className="text-sm text-stone-800 mr-4 font-semibold"
                >
                  Course Code :{" "}
                </label>
                <input
                  type="text"
                  id="course_code"
                  name="course_code"
                  className="bg-white rounded-2xl px-3 py-2 placeholder:text-sm focus:outline-0"
                  placeholder="enter the course code.."
                />
              </div>
              {/* Faculty Id [*]*/}
              <div className="mb-4 flex justify-between items-center  ">
                <label
                  htmlFor="faculty_id"
                  className="text-sm text-stone-800 mr-4 font-semibold"
                >
                  Faculty Id or Name :{" "}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="course_title"
                    className="bg-white rounded-2xl px-3 py-2 placeholder:text-sm focus:outline-1 outline-gray-100 "
                    placeholder="enter faculty id or name.."
                    // on focus show the list
                    onFocus={() => setFacultySelectDropDown(true)}
                    onBlur={() => setFacultySelectDropDown(false)}
                    // on change update the list
                    onChange={handleFacultySearch}
                  />
                  {facultySelectDropDown && (
                    <ul className="absolute bg-white w-[90%] start-1/2 end-0 -translate-x-1/2  rounded-b-2xl overflow-hidden overflow-y-scroll">
                      {faculty_list.map((faculty, idx) => {
                        return (
                          <li
                            className="border-b-[0.5px] border-gray-200 p-2"
                            key={faculty.id}
                            //update the form value on click
                            //find a way to hold the id

                          >
                            {faculty.emp_id}
                            {faculty.name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
              {/* Slot [*]*/}
              <div className="mb-4 flex justify-between items-center ">
                <label
                  htmlFor="slot"
                  className="text-sm text-stone-800 mr-4 font-semibold"
                >
                  Slot :{" "}
                </label>
                <select
                  id="slot"
                  className="bg-white rounded-2xl px-3 py-2 placeholder:text-sm focus:outline-0"
                >
                  {(Object.keys(Slots) as Array<string>)
                    .filter((key) => Number.isNaN(+key))
                    .map((slot) => {
                      console.log(typeof slot);
                      return <option>{slot}</option>;
                    })}
                </select>
              </div>
            
          {/* submit */}
          <input type="submit" value="Add course" className="bg-red-700 mx-auto p-2 rounded-md text-white w-fit" />
            </form>

          </div>
        </div>
      </div>
    </>
  );
};
