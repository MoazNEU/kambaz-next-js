import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

export type Enrollment = {
    _id: string;
    user: string;
    course: string;
};

type EnrollmentsState = {
    enrollments: Enrollment[];
};

const initialState: EnrollmentsState = {
    enrollments: initialEnrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enroll: (
            state,
            { payload }: PayloadAction<{ userId: string; courseId: string }>
        ) => {
            const exists = state.enrollments.some(
                (enrollment) =>
                    enrollment.user === payload.userId &&
                    enrollment.course === payload.courseId
            );
            if (exists) return;
            state.enrollments.push({
                _id: uuidv4(),
                user: payload.userId,
                course: payload.courseId,
            });
        },
        unenroll: (
            state,
            { payload }: PayloadAction<{ userId: string; courseId: string }>
        ) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) =>
                    !(
                        enrollment.user === payload.userId &&
                        enrollment.course === payload.courseId
                    )
            );
        },
        unenrollAllFromCourse: (state, { payload: courseId }: PayloadAction<string>) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => enrollment.course !== courseId
            );
        },
    },
});

export const { enroll, unenroll, unenrollAllFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;