import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStudentField,
  setError,
  clearErrors,
  clearCurrentStudent,
  addStudent,
} from "../store/studentReducer";

export default function StudentInfo() {
  const dispatch = useDispatch();
  const { currentStudent, errors, students } = useSelector(
    (state) => state.student
  );

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    dispatch(
      setStudentField({
        field: name,
        value: value,
      })
    );
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let message = value === "" ? `Vui lòng nhập ${name}` : "";

    switch (name) {
      case "id":
        if (value && !value.match(/^[0-9]+$/)) {
          message = "Vui lòng nhập ID là số nguyên!";
        }
        break;

      case "phoneNumber":
        if (value && !value.match(/^[0-9]+$/)) {
          message = "Vui lòng nhập số điện thoại chỉ chứa số!";
        }
        break;

      case "email":
        if (
          value &&
          !value.match(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          )
        ) {
          message = "Vui lòng nhập email đúng định dạng!";
        }
        break;

      case "name":
        if (value === "") {
          message = "Vui lòng nhập tên!";
        }
        break;

      default:
        break;
    }

    dispatch(
      setError({
        field: name,
        message: message,
      })
    );
  };

  const handleSubmit = () => {
    // Kiểm tra xem tất cả errors có là empty string không
    const hasNoErrors = Object.values(errors).every(
      (error) => error === ""
    );

    if (hasNoErrors) {
      console.log("Thông tin sinh viên:", currentStudent);
      dispatch(addStudent(currentStudent));
      dispatch(clearCurrentStudent());
      dispatch(clearErrors());

      // Hiển thị thông báo thành công hoặc thực hiện hành động khác
      alert("Thêm sinh viên thành công!");
    } else {
      console.log("Có lỗi validation, vui lòng kiểm tra lại!");
      alert("Có lỗi validation, vui lòng kiểm tra lại!");
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Thông tin sinh viên
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã SV
                </label>
                <input
                  type="text"
                  name="id"
                  value={currentStudent.id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleErrors}
                />
                {errors.id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.id}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentStudent.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleErrors}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  SĐT
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={currentStudent.phoneNumber}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleErrors}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={currentStudent.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleErrors}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Thêm sinh viên
        </button>
      </section>
    </div>
  );
}
