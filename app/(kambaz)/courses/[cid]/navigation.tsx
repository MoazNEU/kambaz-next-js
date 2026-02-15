"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
export default function CourseNavigation() {
  const params = useParams();
  const courseId = params.cid as string;
  const pathname = usePathname();
  const links = ["home", "modules", "piazza", "zoom", "assignments", "quizzes", "grades", "people"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {
        links.map(link => (
          <Link href={`/courses/${courseId}/${link}`} key={link} className={`list-group-item border-0 ${link == pathname.split('/')[3] ? ' active bg-white text-black' : ' text-danger'}`}>
            {link}
          </Link>
        ))
      }
    </div>
  );
}
// <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
//   <Link href="/courses/1234/home" id="wd-course-home-link"
//     className="list-group-item active border-0"> Home </Link>
//   <Link href="/courses/1234/modules" id="wd-course-modules-link"
//     className="list-group-item text-danger border-0"> Modules </Link>
//   <Link href="/courses/1234/piazza" id="wd-course-piazza-link"
//     className="list-group-item text-danger border-0"> Piazza </Link>
//   <Link href="/courses/1234/zoom" id="wd-course-zoom-link"
//     className="list-group-item text-danger border-0"> Zoom </Link>
//   <Link href="/courses/1234/assignments" id="wd-course-assignments-link"
//     className="list-group-item text-danger border-0"> Assignments </Link>
//   <Link href="/courses/1234/quizzes" id="wd-course-quizzes-link"
//     className="list-group-item text-danger border-0"> Quizzes </Link>
//   <Link href="/courses/1234/grades" id="wd-course-quizzes-link"
//     className="list-group-item text-danger border-0"> Grades </Link>
//   <Link href="/courses/1234/people/table" id="wd-course-people-link"
//     className="list-group-item text-danger border-0" > People </Link>
// </div>


// <div id="wd-courses-navigation">
//   <Link href="/courses/1234/home" id="wd-course-home-link">Home</Link><br/>
//   <Link href="/courses/1234/modules" id="wd-course-modules-link">Modules
//     </Link><br/>
//   <Link href="/courses/1234/piazza" id="wd-course-piazza-link">Piazza</Link><br/>
//   <Link href="/courses/1234/zoom" id="wd-course-zoom-link">Zoom</Link><br/>
//   <Link href="/courses/1234/assignments" id="wd-course-assignments-link">
//       Assignments</Link><br/>
//   <Link href="/courses/1234/quizzes" id="wd-course-quizzes-link">Quizzes
//     </Link><br/>
//   <Link href="/courses/1234/grades" id="wd-course-grades-link">Grades</Link><br/>
//   <Link href="/courses/1234/people/Table" id="wd-course-people-link">People</Link><br/>
// </div>
//);