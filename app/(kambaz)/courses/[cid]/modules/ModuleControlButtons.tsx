
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  addLesson,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void | Promise<void>;
  editModule: (moduleId: string) => void;
  addLesson: (moduleId: string) => void | Promise<void>;
}) {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => void deleteModule(moduleId)} />
      <GreenCheckmark />
      <BsPlus
        role="button"
        title="Add lesson"
        className="fs-4"
        onClick={() => void addLesson(moduleId)}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}