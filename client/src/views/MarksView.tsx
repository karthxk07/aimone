import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export default () => {
  const [searchQueryList, setSearchQueryList] = useState<[Object] | []>([]);
  const [selectedUser, setSelectedUser] = useState<{ name: string; regno: string }>();
  const [timetable, setTimeTable] = useState<
    [[{ course_code: string; course_title: string }]] | []
  >([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const periods = 9;
  const startHour = 8;
  const periodDuration = 55;

  // Helper to format time
  const formatTime = (index: number) => {
    const totalMinutes = index * periodDuration;
    const startH = startHour + Math.floor(totalMinutes / 60);
    const startM = totalMinutes % 60;
    const endTotalMinutes = totalMinutes + periodDuration;
    const endH = startHour + Math.floor(endTotalMinutes / 60);
    const endM = endTotalMinutes % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(startH)}:${pad(startM)} - ${pad(endH)}:${pad(endM)}`;
  };

  const searchQueryHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.value === "") {
      setSearchQueryList([]);
      return;
    }

    axios
      .get("http://localhost:3001/api/user_util/findUsersByRegNo", {
        params: {
          searchQuery: e.currentTarget.value,
        },
      })
      .then((res: AxiosResponse<any, any>) => {
        setSearchQueryList(res.data);
      });
  };

  const fetchTimetable = (user: { name: string; regno: string }) => {
    axios
      .get("http://localhost:3001/api/user_util/getTimetableByRegNo", {
        params: {
          regno: user.regno,
        },
      })
      .then((res) => {
        setTimeTable(res.data);
      });
  };

  return (
    <>
      <input type="text" onChange={searchQueryHandler} className="text-black" />
      <ul>
        {searchQueryList?.map((user, idx) => (
          <li
            key={idx}
            onClick={() => {
              setSelectedUser(user as { name: string; regno: string });
              fetchTimetable(user as { name: string; regno: string });
            }}
          >
            <b>{(user as { name: string; regno: string }).regno}</b>{" "}
            {(user as { name: string; regno: string }).name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Time</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: periods }).map((_, periodIndex) => (
                <tr key={periodIndex}>
                  <td>{formatTime(periodIndex)}</td>
                  {days.map((day, dayIndex) => (
                    <td key={`${dayIndex}.${day}`}>
                      <div>
                        <b>
                          {timetable.length === 0
                            ? ""
                            : timetable[dayIndex][periodIndex].course_code}
                        </b>
                        <br />
                        {timetable.length === 0
                          ? ""
                          : timetable[dayIndex][periodIndex].course_title}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
