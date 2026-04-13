/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    modules: [] as any[],
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action: PayloadAction<any[]>) => {
            state.modules = action.payload;
        },
        addModule: (state, { payload: module }) => {
            state.modules = [...state.modules, module] as any;
        },
        deleteModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.filter(
                (m: any) => m._id !== moduleId);
        },
        updateModule: (state, { payload: module }) => {
            state.modules = state.modules.map((m: any) =>
                m._id === module._id ? module : m
            ) as any;
        },
        editModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.map((m: any) =>
                m._id === moduleId ? { ...m, editing: true } : m
            ) as any;
        },
        editLesson: (
            state,
            {
                payload: { moduleId, lessonId },
            }: PayloadAction<{ moduleId: string; lessonId: string }>
        ) => {
            state.modules = state.modules.map((m: any) => {
                if (m._id !== moduleId) return m;
                return {
                    ...m,
                    lessons: (m.lessons ?? []).map((l: any) =>
                        l._id === lessonId
                            ? { ...l, editing: true }
                            : { ...l, editing: false }
                    ),
                };
            }) as any;
        },
        updateLesson: (
            state,
            {
                payload,
            }: PayloadAction<{
                moduleId: string;
                lessonId: string;
                updates: Record<string, unknown>;
            }>
        ) => {
            const { moduleId, lessonId, updates } = payload;
            state.modules = state.modules.map((m: any) => {
                if (m._id !== moduleId) return m;
                return {
                    ...m,
                    lessons: (m.lessons ?? []).map((l: any) =>
                        l._id === lessonId ? { ...l, ...updates } : l
                    ),
                };
            }) as any;
        },
    },
});
export const {
    setModules,
    addModule,
    deleteModule,
    updateModule,
    editModule,
    editLesson,
    updateLesson,
} =
    modulesSlice.actions;
export default modulesSlice.reducer;
