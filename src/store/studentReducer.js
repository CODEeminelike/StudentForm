import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  currentStudent: {
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
  errors: {
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
};

const studentReducer = createSlice({
  name: "studentReducer",
  initialState,
  reducers: {
    setStudentField: (state, action) => {
      const { field, value } = action.payload;
      state.currentStudent[field] = value;
    },
    setError: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    clearErrors: (state) => {
      state.errors = initialState.errors;
    },
    clearCurrentStudent: (state) => {
      state.currentStudent = initialState.currentStudent;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    // Thêm action deleteStudent
    deleteStudent: (state, action) => {
      const studentId = action.payload;
      state.students = state.students.filter(
        (student) => student.id !== studentId
      );
    },
  },
});

export const {
  setStudentField,
  setError,
  clearErrors,
  clearCurrentStudent,
  addStudent,
  deleteStudent, // Export action mới
} = studentReducer.actions;

export default studentReducer.reducer;
