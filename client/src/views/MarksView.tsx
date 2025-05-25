import axios from "axios";
import { useEffect, useState } from "react";

//todo implement a sidebar , and different views

export default () => {
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

  //get  timetable
  const fetchTimetable = () => {
    axios
      .get("http://localhost:3001/api/user_util/getTimetable")
      .then((res) => {
        setTimeTable(res.data.timetable);
      });
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  return (
    <>
      {timetable.length != 0 && (
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
                      <p>{timetable[dayIndex][periodIndex].course_code}</p>
                      <p>{timetable[dayIndex][periodIndex].course_title}</p>
                      <br />
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
