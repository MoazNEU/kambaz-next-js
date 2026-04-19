"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import type { Quiz } from "../../../../quizzes/client";
import * as client from "../../../../quizzes/client";

function toDisplayDate(value?: string) {
  if (!value) {
    return "N/A";
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return value;
  }
  return d.toLocaleString();
}

function prettify(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = useMemo(
    () => ["FACULTY", "ADMIN"].includes(currentUser?.role ?? ""),
    [currentUser?.role]
  );

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.findQuizById(qid);
      setQuiz(data);
    } catch (e) {
      console.error(e);
      setError("Unable to load quiz.");
    } finally {
      setLoading(false);
    }
  }, [qid]);

  useEffect(() => {
    void loadQuiz();
  }, [loadQuiz]);

  if (loading) {
    return <p>Loading quiz...</p>;
  }
  if (error || !quiz) {
    return <p className="text-danger">{error ?? "Quiz not found."}</p>;
  }

  return (
    <div id="wd-quiz-details">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-muted">
            {quiz.published ? (
              <Badge bg="success">Published</Badge>
            ) : (
              <Badge bg="secondary">Unpublished</Badge>
            )}
            <span className="ms-2">{quiz.availability?.label}</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          {isFaculty ? (
            <>
              <Link href={`/courses/${cid}/quizzes/${quiz._id}/take?preview=true`}>
                <Button variant="secondary">Preview</Button>
              </Link>
              <Link href={`/courses/${cid}/quizzes/${quiz._id}/edit`}>
                <Button variant="danger">Edit</Button>
              </Link>
            </>
          ) : (
            <Link href={`/courses/${cid}/quizzes/${quiz._id}/take`}>
              <Button variant="danger">Start Quiz</Button>
            </Link>
          )}
        </div>
      </div>

      <Card className="p-3">
        <p className="mb-3">{quiz.description || "No description provided."}</p>
        <Row className="g-3">
          <Col md={6}>
            <strong>Quiz Type:</strong> {prettify(quiz.quizType)}
          </Col>
          <Col md={6}>
            <strong>Assignment Group:</strong> {prettify(quiz.assignmentGroup)}
          </Col>
          <Col md={6}>
            <strong>Points:</strong> {quiz.points ?? 0}
          </Col>
          <Col md={6}>
            <strong>Questions:</strong> {quiz.questionCount ?? 0}
          </Col>
          <Col md={6}>
            <strong>Time Limit:</strong> {quiz.timeLimit} minutes
          </Col>
          <Col md={6}>
            <strong>Attempts:</strong>{" "}
            {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
          </Col>
          <Col md={6}>
            <strong>Due:</strong> {toDisplayDate(quiz.dueDate)}
          </Col>
          <Col md={6}>
            <strong>Available From:</strong> {toDisplayDate(quiz.availableDate)}
          </Col>
          <Col md={6}>
            <strong>Available Until:</strong> {toDisplayDate(quiz.untilDate)}
          </Col>
          {!isFaculty && (
            <Col md={6}>
              <strong>Last Score:</strong>{" "}
              {quiz.score == null ? "No attempts yet" : `${quiz.score}/${quiz.points ?? 0}`}
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
}
