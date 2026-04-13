import coursesSeed from "@/app/(kambaz)/database/courses.js";
import usersSeed from "@/app/(kambaz)/database/users.js";
import enrollmentsSeed from "@/app/(kambaz)/database/enrollments.js";
import modulesSeed from "@/app/(kambaz)/database/modules.js";
import assignmentsSeed from "@/app/(kambaz)/database/assignments.js";

export type JsonRecord = Record<string, unknown>;

export const SESSION_COOKIE = "kambaz_session";

export const db = {
  courses: structuredClone(coursesSeed) as JsonRecord[],
  users: structuredClone(usersSeed) as JsonRecord[],
  enrollments: structuredClone(enrollmentsSeed) as JsonRecord[],
  modules: structuredClone(modulesSeed) as JsonRecord[],
  assignments: structuredClone(assignmentsSeed) as JsonRecord[],
};

export function stripPassword(u: JsonRecord): JsonRecord {
  const { password: _p, ...rest } = u;
  return rest;
}

export function publicUser(u: JsonRecord): JsonRecord {
  return stripPassword(u);
}

export function findUserByCredentials(username: string, password: string) {
  return db.users.find(
    (u) => u.username === username && u.password === password
  );
}

export function enrollmentsForUser(userId: string) {
  return db.enrollments.filter((e) => e.user === userId);
}

export function coursesForUser(userId: string) {
  const ids = new Set(
    enrollmentsForUser(userId).map((e) => String(e.course))
  );
  return db.courses.filter((c) => ids.has(String(c._id)));
}

export function enrollUser(userId: string, courseId: string) {
  const exists = db.enrollments.some(
    (e) => e.user === userId && String(e.course) === courseId
  );
  if (exists) return;
  db.enrollments.push({
    _id: crypto.randomUUID(),
    user: userId,
    course: courseId,
  });
}

export function unenrollUser(userId: string, courseId: string) {
  const i = db.enrollments.findIndex(
    (e) => e.user === userId && String(e.course) === courseId
  );
  if (i >= 0) db.enrollments.splice(i, 1);
}

export function usersForCourse(courseId: string) {
  const cid = String(courseId);
  const userIds = db.enrollments
    .filter((e) => String(e.course) === cid)
    .map((e) => String(e.user));
  /** One row per user — duplicate enrollment rows would repeat _id and break React keys. */
  const seen = new Set<string>();
  const uniqueIds: string[] = [];
  for (const id of userIds) {
    if (seen.has(id)) continue;
    seen.add(id);
    uniqueIds.push(id);
  }
  const rows = uniqueIds
    .map((id) => db.users.find((u) => String(u._id) === id))
    .filter((u): u is JsonRecord => u != null)
    .map((u) => publicUser(u));
  rows.sort((a, b) => {
    const byLast = String(a.lastName ?? "").localeCompare(
      String(b.lastName ?? ""),
      undefined,
      { sensitivity: "base" }
    );
    if (byLast !== 0) return byLast;
    return String(a.firstName ?? "").localeCompare(String(b.firstName ?? ""), undefined, {
      sensitivity: "base",
    });
  });
  return rows;
}

export function modulesForCourse(courseId: string) {
  return db.modules.filter((m) => String(m.course) === courseId);
}

export function assignmentsForCourse(courseId: string) {
  return db.assignments.filter((a) => String(a.course) === courseId);
}

export function removeCourseCascade(courseId: string) {
  const id = String(courseId);
  db.courses = db.courses.filter((c) => String(c._id) !== id);
  db.enrollments = db.enrollments.filter((e) => String(e.course) !== id);
  db.modules = db.modules.filter((m) => String(m.course) !== id);
  db.assignments = db.assignments.filter((a) => String(a.course) !== id);
}
