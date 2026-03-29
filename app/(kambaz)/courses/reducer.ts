import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    courses: [] as any[],
};
const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state, { payload: course }) => {
            state.courses = [...state.courses, course];
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter(
                (course) => course._id !== courseId
            );
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c) =>
                c._id === course._id ? course : c
            );
        },
        setCourses: (state, { payload: courses }) => {
            state.courses = courses;
        },
    },
});
export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
    coursesSlice.actions;
export default coursesSlice.reducer;