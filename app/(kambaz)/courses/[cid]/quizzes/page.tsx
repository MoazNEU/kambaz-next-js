"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Dropdown, ListGroup, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import type { Quiz } from "../../../quizzes/client";
import * as client from "../../../quizzes/client";

function formatDateText(value?: string) {
  if (!value) {
    return "N/A";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString();
}

export default function QuizzesPage() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = useMemo(
    () => ["FACULTY", "ADMIN"].includes(currentUser?.role ?? ""),
    [currentUser?.role]
  );

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  const loadQuizzes = useCallback(async () => {
    if (!cid) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await client.findQuizzesForCourse(cid);
      setQuizzes(data);
    } catch (e) {
      console.error(e);
      setError("Unable to load quizzes.");
    } finally {
      setLoading(false);
    }
  }, [cid]);

  useEffect(() => {
    void loadQuizzes();
  }, [loadQuizzes]);

  const onAddQuiz = async () => {
    if (!cid || !isFaculty) {
      return;
    }
    const created = await client.createQuiz(cid, {
      title: "New Quiz",
      description: "",
      timeLimit: 20,
      howManyAttempts: 1,
      multipleAttempts: false,
    });
    router.push(`/courses/${cid}/quizzes/${created._id}/edit`);
  };

  const onTogglePublish = async (quiz: Quiz) => {
    const updated = await client.setQuizPublished(quiz._id, !quiz.published);
    setQuizzes((current) =>
      current.map((q) => (q._id === quiz._id ? { ...q, published: updated.published } : q))
    );
  };

  const onDeleteQuiz = async () => {
    if (!quizToDelete) {
      return;
    }
    await client.deleteQuiz(quizToDelete._id);
    setQuizzes((current) => current.filter((quiz) => quiz._id !== quizToDelete._id));
    setQuizToDelete(null);
  };

  return (
    <div id="wd-quizzes">
      <Modal show={Boolean(quizToDelete)} onHide={() => setQuizToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <strong>{quizToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setQuizToDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onDeleteQuiz}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Quizzes</h2>
        {isFaculty && (
          <Button variant="danger" onClick={onAddQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        )}
      </div>

      {loading && <p>Loading quizzes...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && quizzes.length === 0 && (
        <p className="text-muted">
          No quizzes yet. {isFaculty ? "Click + Quiz to create one." : "No published quizzes yet."}
        </p>
      )}

      <ListGroup>
        {quizzes.map((quiz) => (
          <ListGroup.Item
            key={quiz._id}
            className="d-flex justify-content-between align-items-start gap-3"
          >
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2">
                {quiz.published ? (
                  <Badge bg="success">Published</Badge>
                ) : (
                  <Badge bg="secondary">Unpublished</Badge>
                )}
                <Link href={`/courses/${cid}/quizzes/${quiz._id}`} className="fw-semibold text-decoration-none">
                  {quiz.title}
                </Link>
              </div>
              <div className="small text-muted mt-2">
                <div>{quiz.availability?.label ?? "Available"}</div>
                <div>
                  Due {formatDateText(quiz.dueDate)} | {quiz.points ?? 0} pts |{" "}
                  {quiz.questionCount ?? 0} questions
                  {!isFaculty && quiz.score != null ? ` | Score: ${quiz.score}` : ""}
                </div>
              </div>
            </div>
            {isFaculty && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" size="sm">
                  <IoEllipsisVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} href={`/courses/${cid}/quizzes/${quiz._id}/edit`}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => void onTogglePublish(quiz)}>
                    {quiz.published ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger" onClick={() => setQuizToDelete(quiz)}>
                    <FaTrash className="me-2" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
