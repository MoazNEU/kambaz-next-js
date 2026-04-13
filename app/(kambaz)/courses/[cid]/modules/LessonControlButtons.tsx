import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons({
  moduleId,
  lessonId,
  editLesson,
}: {
  moduleId: string;
  lessonId: string;
  editLesson: (moduleId: string, lessonId: string) => void;
}) {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <FaPencil
        role="button"
        className="text-primary"
        title="Edit lesson name"
        onClick={() => editLesson(moduleId, lessonId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
