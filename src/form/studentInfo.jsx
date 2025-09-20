import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStudentField,
  setError,
  clearErrors,
  clearCurrentStudent,
  addStudent,
  updateStudent,
  cancelEditing,
} from "../store/studentReducer";

export default function StudentInfo() {
  const dispatch = useDispatch();
  const { currentStudent, errors, isEditing, editingStudentId } =
    useSelector((state) => state.student);

  // useEffect để reset form khi cancel editing
  useEffect(() => {
    if (!isEditing) {
      dispatch(clearCurrentStudent());
      dispatch(clearErrors());
    }
  }, [isEditing, dispatch]);

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
      if (isEditing) {
        // Cập nhật sinh viên
        dispatch(updateStudent(currentStudent));
        alert("Cập nhật sinh viên thành công!");
      } else {
        // Thêm sinh viên mới
        dispatch(addStudent(currentStudent));
        dispatch(clearCurrentStudent());
        alert("Thêm sinh viên thành công!");
      }
      dispatch(clearErrors());
    } else {
      alert("Có lỗi validation, vui lòng kiểm tra lại!");
    }
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {isEditing
              ? "Chỉnh sửa thông tin sinh viên"
              : "Thông tin sinh viên"}
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
                  disabled={isEditing} // Disable ID khi đang chỉnh sửa
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50"
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
          <div className="mt-6 flex space-x-4">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              {isEditing ? "Cập nhật" : "Thêm sinh viên"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={handleCancel}
              >
                Hủy
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
