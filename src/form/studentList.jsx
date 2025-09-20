import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStudent,
  startEditing,
  setSearchTerm,
} from "../store/studentReducer";

export default function StudentList() {
  const dispatch = useDispatch();
  const { students, searchTerm } = useSelector(
    (state) => state.student
  );

  // Hàm xử lý xóa sinh viên
  const handleDelete = (studentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      dispatch(deleteStudent(studentId));
    }
  };

  // Hàm xử lý chỉnh sửa
  const handleEdit = (studentId) => {
    dispatch(startEditing(studentId));
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  // Lọc sinh viên dựa trên searchTerm
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.phoneNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tìm kiếm sinh viên
        </label>
        <input
          type="text"
          id="search"
          placeholder="Tìm theo tên, mã SV, email hoặc SĐT..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

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
            {filteredStudents.map((student, index) => (
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
                      onClick={() => handleEdit(student.id)}
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(student.id)}
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {searchTerm
                    ? "Không tìm thấy sinh viên phù hợp"
                    : "Chưa có sinh viên nào được thêm"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
