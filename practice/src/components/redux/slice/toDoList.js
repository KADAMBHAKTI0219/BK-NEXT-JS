import { createSlice } from "@reduxjs/toolkit";

export const toDoListSlice = createSlice({
  name: "toDoList",
  initialState: {
    toDoList: [],
    toggleComplete:false,
  },
  reducers: {
    addTask(state, action) {
      state.toDoList.push(action.payload);
    },
    toggleComplete(state, action) {
      state.toggleComplete = !state.toggleComplete;
    },
    deleteTask(state, action) {
      state.toDoList = state.toDoList.filter(
        (task) => task !== action.payload
      );
    },
  },
});


export const {addTask,toggleComplete,deleteTask} = toDoListSlice.actions;
export default toDoListSlice.reducer;
