import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../store/studentReducer"; // Import action delete

export default function StudentList() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);

  // Hàm xử lý xóa sinh viên
  const handleDelete = (studentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      dispatch(deleteStudent(studentId));
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã SV
              </th>
              <th scope="col" className="px-6 py-3">
                Họ và tên
              </th>
              <th scope="col" className="px-6 py-3">
                SĐT
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-700"
                } dark:border-gray-700`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {student.id}
                </td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.phoneNumber}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(student.id)} // Thêm onClick xử lý xóa
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Chưa có sinh viên nào được thêm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
