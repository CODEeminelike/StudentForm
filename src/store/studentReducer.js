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
  isEditing: false,
  editingStudentId: null,
  searchTerm: "", // Thêm searchTerm
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
    deleteStudent: (state, action) => {
      const studentId = action.payload;
      state.students = state.students.filter(
        (student) => student.id !== studentId
      );
    },
    startEditing: (state, action) => {
      const studentId = action.payload;
      const studentToEdit = state.students.find(
        (student) => student.id === studentId
      );
      if (studentToEdit) {
        state.currentStudent = { ...studentToEdit };
        state.isEditing = true;
        state.editingStudentId = studentId;
      }
    },
    cancelEditing: (state) => {
      state.isEditing = false;
      state.editingStudentId = null;
      state.currentStudent = initialState.currentStudent;
      state.errors = initialState.errors;
    },
    updateStudent: (state, action) => {
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (student) => student.id === state.editingStudentId
      );
      if (index !== -1) {
        state.students[index] = updatedStudent;
        state.isEditing = false;
        state.editingStudentId = null;
        state.currentStudent = initialState.currentStudent;
      }
    },
    // Action cho tìm kiếm
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setStudentField,
  setError,
  clearErrors,
  clearCurrentStudent,
  addStudent,
  deleteStudent,
  startEditing,
  cancelEditing,
  updateStudent,
  setSearchTerm,
} = studentReducer.actions;

export default studentReducer.reducer;
