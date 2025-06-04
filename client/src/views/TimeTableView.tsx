import axios from "axios";
import { useEffect, useState } from "react";

type CourseSlot = { course_code: string; course_title: string };
type TimetableType = CourseSlot[][];

export default function Timetable() {
  const [timetable, setTimeTable] = useState<TimetableType>([]);

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

  const fetchTimetable = () => {
    axios
      .get("http://localhost:3001/api/user_util/getTimetable")
      .then((res) => setTimeTable(res.data.timetable));
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

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

  return timetable.length ? (
    <div className="overflow-x-auto m-10">
      <table className="table-auto w-full border border-black text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black px-4 py-2">Time</th>
            {days.map((day) => (
              <th key={day} className="border border-black px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: periods }).map((_, periodIndex) => (
            <tr key={periodIndex}>
              <td className="border border-black px-4 py-2 font-medium">
                {formatTime(periodIndex)}
              </td>
              {days.map((_, dayIndex) => {
                const slot = timetable[dayIndex]?.[periodIndex];
                const isOccupied =
                  slot?.course_code?.trim() || slot?.course_title?.trim();

                return (
                  <td
                    key={`${dayIndex}-${periodIndex}`}
                    className={`border border-black px-2 py-2 ${
                      isOccupied ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {isOccupied && (
                      <>
                        <p className="font-semibold m-0">{slot.course_code}</p>
                        <p className="m-0">{slot.course_title}</p>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
}
