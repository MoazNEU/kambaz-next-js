"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Card, Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import type { AttemptAnswer, Quiz, QuizAttempt, QuizQuestion } from "../../../../../quizzes/client";
import * as client from "../../../../../quizzes/client";

type ResponseMap = Record<string, string>;

export default function TakeQuizPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewMode = searchParams.get("preview") === "true";

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = useMemo(
    () => ["FACULTY", "ADMIN"].includes(currentUser?.role ?? ""),
    [currentUser?.role]
  );

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [responses, setResponses] = useState<ResponseMap>({});
  const [accessCode, setAccessCode] = useState("");
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [previewResult, setPreviewResult] = useState<{
    score: number;
    totalPoints: number;
    answers: AttemptAnswer[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [quizData, questionData, attemptData] = await Promise.all([
        client.findQuizById(qid),
        client.findQuestionsForQuiz(qid),
        client.findLatestAttempt(qid),
      ]);
      setQuiz(quizData);
      setQuestions(questionData);
      setLatestAttempt(attemptData);
    } catch (e) {
      console.error(e);
      setError("Unable to load quiz.");
    } finally {
      setLoading(false);
    }
  }, [qid]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    if (!latestAttempt || previewMode) {
      return;
    }
    const nextResponses: ResponseMap = {};
    for (const answer of latestAttempt.answers) {
      nextResponses[answer.question] =
        answer.answer == null ? "" : String(answer.answer);
    }
    setResponses(nextResponses);
  }, [latestAttempt, previewMode]);

  const gradingAnswers = previewResult?.answers ?? result?.answers ?? latestAttempt?.answers ?? [];
  const score = previewResult?.score ?? result?.score ?? latestAttempt?.score;
  const totalPoints = previewResult?.totalPoints ?? result?.totalPoints ?? latestAttempt?.totalPoints;

  const onSubmit = async () => {
    if (!quiz) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const answers = questions.map((question) => ({
        question: question._id,
        answer: responses[question._id] ?? "",
      }));
      const submitted = await client.submitAttempt(qid, {
        preview: previewMode && isFaculty,
        accessCode: accessCode || undefined,
        answers,
      });

      if ("preview" in submitted) {
        setPreviewResult({
          score: submitted.score,
          totalPoints: submitted.totalPoints,
          answers: submitted.answers,
        });
      } else {
        setResult(submitted);
      }
    } catch (e: unknown) {
      console.error(e);
      setError("Unable to submit. Check access code, availability window, or attempts.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading quiz...</p>;
  }
  if (!quiz) {
    return <p className="text-danger">{error ?? "Quiz not found."}</p>;
  }

  return (
    <div id="wd-take-quiz">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">
            {previewMode ? "Quiz Preview" : "Take Quiz"}: {quiz.title}
          </h2>
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
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
            Back
          </Button>
          {isFaculty && previewMode && (
            <Link href={`/courses/${cid}/quizzes/${qid}/edit`}>
              <Button variant="outline-danger">Edit Quiz</Button>
            </Link>
          )}
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {(score ?? totalPoints) != null && (
        <Alert variant="info">
          Score: <strong>{score ?? 0}</strong> / <strong>{totalPoints ?? 0}</strong>
          {result ? ` (Attempt #${result.attemptNumber})` : ""}
        </Alert>
      )}

      {quiz.accessCode && !previewMode && (
        <Card className="p-3 mb-3">
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter quiz access code"
          />
        </Card>
      )}

      <ListGroup className="mb-3">
        {questions.map((question, index) => {
          const graded = gradingAnswers.find((answer) => answer.question === question._id);
          return (
            <ListGroup.Item key={question._id}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <strong>
                    Q{index + 1}. {question.title}
                  </strong>
                  <div className="text-muted small">{question.points} points</div>
                </div>
                {graded && (
                  <Badge bg={graded.correct ? "success" : "danger"}>
                    {graded.correct ? "Correct" : "Incorrect"}
                  </Badge>
                )}
              </div>
              <p>{question.question}</p>

              {question.type === "MULTIPLE_CHOICE" &&
                question.choices.map((choice, choiceIndex) => (
                  <Form.Check
                    key={`${question._id}-${choiceIndex}`}
                    type="radio"
                    name={question._id}
                    label={choice}
                    checked={responses[question._id] === String(choiceIndex)}
                    disabled={Boolean(result)}
                    onChange={() =>
                      setResponses((current) => ({
                        ...current,
                        [question._id]: String(choiceIndex),
                      }))
                    }
                  />
                ))}

              {question.type === "TRUE_FALSE" && (
                <>
                  <Form.Check
                    type="radio"
                    name={question._id}
                    label="True"
                    checked={responses[question._id] === "true"}
                    disabled={Boolean(result)}
                    onChange={() =>
                      setResponses((current) => ({ ...current, [question._id]: "true" }))
                    }
                  />
                  <Form.Check
                    type="radio"
                    name={question._id}
                    label="False"
                    checked={responses[question._id] === "false"}
                    disabled={Boolean(result)}
                    onChange={() =>
                      setResponses((current) => ({ ...current, [question._id]: "false" }))
                    }
                  />
                </>
              )}

              {question.type === "FILL_IN_BLANK" && (
                <Form.Control
                  value={responses[question._id] ?? ""}
                  disabled={Boolean(result)}
                  onChange={(e) =>
                    setResponses((current) => ({
                      ...current,
                      [question._id]: e.target.value,
                    }))
                  }
                  placeholder="Type your answer"
                />
              )}

              {graded && (
                <div className="small mt-2 text-muted">
                  Your answer: <strong>{String(graded.answer ?? "") || "No answer"}</strong>
                </div>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {!result && (
        <Button variant="danger" onClick={() => void onSubmit()} disabled={submitting}>
          {submitting ? "Submitting..." : previewMode ? "Submit Preview" : "Submit Quiz"}
        </Button>
      )}
    </div>
  );
}
