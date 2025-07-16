//search for a class no : get request to /api/course/getCourseByClassNo

import axios, { AxiosResponse } from "axios";
import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Slots } from "../../enums";

//checkboxes of students
//get students list, initially : empty list, two select option : dept and year , apply the dept and year filter and get the list

//select all button to tick all checkboxes
//add participants , get the regno of all students and the class no

interface Course {
  _id?: string;
  class_no?: string;
  course_no?: string;
  course_title?: string;
  faculty?: string;
  participants?: [Object];
  marks?: [Object];
  attendence?: [Object];
  slot?: Slots;
  year?: number;
}

export default () => {
  //refs
  const classNoInputRef = useRef<HTMLInputElement | null>(null);
  const classNoInputDivRef = useRef<HTMLDivElement | null>(null);

  //states
  const [class_no, setClassNo] = useState<string>("");
  const [course_list, setCourseList] = useState<[Course] | []>([]);
  const [classNoSelectDropDown, setClassNoSelectDropDown] =
    useState<boolean>(false);
  const [showParticipantTable, setShowParticipantTable] =
    useState<boolean>(false);
  const [course_info, setCourseInfo] = useState<Course | null>(null);

  //fetch the list of classes
  const searchClassQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassNo(e.target.value);

    //get request to /api/course/getCourseeByClassNo
    // await axios
    //   .get("http://localhost:3001/api/course/searchCoursesByClassNo", {
    //     withCredentials: true,
    //     params: {
    //       class_no: class_no,
    //     },
    //   })
    //   .then((res) => {
    //     setCourseList(res.data);
    //   })
    //   .catch((e) => {
    //     alert(e.message);
    //   });

    //simulate dummy list
    const dummy_list: [Course] = [{ _id: "123", class_no: "123123" }];
    setCourseList(dummy_list);
  };

  //handle a class no sleect from the list
  const handleClassNoSelect = async () => {
    //update the form value on click
    //find a way to hold the id

    // disable and fix the class no on select
    setClassNoSelectDropDown(false);
    if (classNoInputRef.current && classNoInputDivRef.current) {
      classNoInputRef.current.disabled = true;
      classNoInputDivRef.current.style = "background-color :#b4b4b4";
      classNoInputRef.current.style = "cursor:not-allowed";
    }

    //get information about the course

    //hit a GET request to /api/course/getCourseInfo
    // const course: AxiosResponse = await axios.get(
    //   "http://localhost:3001/api/course/getCourseInfo",
    //   {
    //     withCredentials: true,
    //     params: {
    //       class_no,
    //     },
    //   }
    // );

    // //set course info
    // setCourseInfo(course.data);

    //simulate dummy data
    const dummy_course = {
      _id: "123345",
      class_no: "CH123143223",
      course_no: "MBA101",
      course_title: "Random course",
      faculty: "Random faculty",
      slot: Slots.F4,
      year: 2025,
    };
    setCourseInfo(dummy_course);

    //update a showInfo state
    setShowParticipantTable(true);
  };

  return (
    <>
      <div className="w-full font-sans flex flex-col">
        <div className="inline-flex items-center gap-2">
          <FaUser />
          <p className="text-2xl">Add Participants</p>
        </div>
        <div className="w-full flex  justify-center">
          <div className="m-5 p-5 bg-stone-200 rounded-2xl flex flex-col w-[70%]">
            <div className="flex flex-row ">
              {/* Class no */}
              <div className="w-1/2 flex justify-center items-center ">
                {/* make a search bar */}
                <div className="flex items-center  w-fit">
                  <label
                    htmlFor="class_no"
                    className="text-sm text-stone-800 mr-4 font-semibold text-nowrap"
                  >
                    Class no :{" "}
                  </label>
                  <div
                    className=" bg-white focus:outline-1 min-w-2xs max-w-2xs w-2xs items-center justify-around outline-gray-100  rounded-2xl px-3 py-2  flex "
                    ref={classNoInputDivRef}
                  >
                    <div className="relative w-[90%] ">
                      <input
                        type="text"
                        name="class_no"
                        id="class_no"
                        className="placeholder:text-sm outline-0 w-full"
                        placeholder="enter class no .. "
                        onChange={searchClassQuery}
                        onFocus={() => setClassNoSelectDropDown(true)}
                        onBlur={() =>
                          setTimeout(() => setClassNoSelectDropDown(false), 200)
                        }
                        value={class_no}
                        ref={classNoInputRef}
                      />
                      {/* absolute drop down with matching class nos */}
                      {classNoSelectDropDown && (
                        <ul className="absolute bg-white w-[90%] cursor-d start-1/2 end-0 -translate-x-1/2  rounded-b-2xl overflow-hidden overflow-y-scroll">
                          {course_list.map((course, idx) => {
                            return (
                              <li
                                className="border-b-[0.5px]  border-gray-200 p-2"
                                key={idx}
                                onClick={() => {
                                  setClassNo(course.class_no as string);
                                  handleClassNoSelect();
                                }}
                              >
                                {course.class_no}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    {/* cross button to clear selection */}
                    {classNoInputRef.current &&
                    classNoInputRef.current.disabled == true ? (
                      <FaX
                        onClick={() => {
                          setClassNo("");
                          if (
                            classNoInputRef.current &&
                            classNoInputDivRef.current
                          ) {
                            classNoInputRef.current.disabled = false;
                            classNoInputDivRef.current.style =
                              "background-color :white";
                            classNoInputRef.current.style = "cursor:text";
                          }
                        }}
                      />
                    ) : (
                      "   "
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/2 border-l-[1px]">
                {/* optionally render the remaining form */}
                {showParticipantTable && <div className="">
                  
                  </div>}
              </div>
            </div>
            {/* participants table */}
            {showParticipantTable && <div></div>}
          </div>
        </div>
      </div>
    </>
  );
};
