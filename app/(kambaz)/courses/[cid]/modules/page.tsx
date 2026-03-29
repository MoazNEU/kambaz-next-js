/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  editModule,
  updateModule as updateModuleInStore,
  setModules,
} from "./reducer";
import * as client from "../../client";

function stripEditingForApi(module: any) {
  const { editing: _e, ...rest } = module;
  return rest;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = useCallback(async () => {
    if (!cid) return;
    const data = await client.findModulesForCourse(cid as string);
    dispatch(setModules(data));
  }, [cid, dispatch]);

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(
      setModules(modules.filter((m: any) => m._id !== moduleId))
    );
  };

  const onUpdateModule = async (moduleId: string) => {
    const mod = modules.find((m: any) => m._id === moduleId);
    if (!mod) return;
    const toSave = { ...mod, editing: false };
    await client.updateModule(stripEditingForApi(toSave));
    dispatch(
      setModules(
        modules.map((m: any) => (m._id === moduleId ? toSave : m))
      )
    );
  };

  const onAddLesson = async (moduleId: string) => {
    const mod = modules.find((m: any) => m._id === moduleId);
    if (!mod) return;
    const newLesson = {
      _id: crypto.randomUUID(),
      name: "New Lesson",
      description: "",
      module: moduleId,
    };
    const lessons = [...(mod.lessons ?? []), newLesson];
    const toSave = { ...mod, lessons, editing: false };
    await client.updateModule(stripEditingForApi(toSave));
    dispatch(
      setModules(
        modules.map((m: any) => (m._id === moduleId ? toSave : m))
      )
    );
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const created = await client.createModuleForCourse(
      cid as string,
      newModule
    );
    const normalized = {
      ...created,
      lessons: created.lessons ?? [],
    };
    dispatch(setModules([...modules, normalized]));
    setModuleName("");
  };

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />{" "}
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  value={module.name ?? ""}
                  onChange={(e) =>
                    dispatch(
                      updateModuleInStore({
                        ...module,
                        name: e.target.value,
                      })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      void onUpdateModule(module._id);
                    }
                  }}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
                addLesson={(moduleId) => void onAddLesson(moduleId)}
              />
            </div>
            <ListGroup className="wd-lessons rounded-0">
                {(module.lessons ?? []).map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
