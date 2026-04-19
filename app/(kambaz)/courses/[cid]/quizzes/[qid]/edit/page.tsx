"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import type { Quiz, QuizQuestion } from "../../../../../quizzes/client";
import * as client from "../../../../../quizzes/client";

function defaultQuestionForType(
  type: QuizQuestion["type"]
): Partial<QuizQuestion> {
  if (type === "TRUE_FALSE") {
    return {
      type,
      title: "New True/False Question",
      points: 1,
      question: "",
      correctTrueFalse: true,
    };
  }
  if (type === "FILL_IN_BLANK") {
    return {
      type,
      title: "New Fill in the Blank",
      points: 1,
      question: "",
      blankAnswers: ["answer"],
    };
  }
  return {
    type: "MULTIPLE_CHOICE",
    title: "New Multiple Choice Question",
    points: 1,
    question: "",
    choices: ["Choice 1", "Choice 2"],
    correctChoice: 0,
  };
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatDateTimeLocal(value?: string) {
  if (!value) {
    return "";
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return value;
  }
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
}

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [newQuestionType, setNewQuestionType] =
    useState<QuizQuestion["type"]>("MULTIPLE_CHOICE");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [quizData, questionData] = await Promise.all([
        client.findQuizById(qid),
        client.findQuestionsForQuiz(qid),
      ]);
      setQuiz(quizData);
      setQuestions(questionData);
    } catch (e) {
      console.error(e);
      setQuiz(null);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [qid]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const computedPoints = useMemo(
    () => questions.reduce((sum, question) => sum + Number(question.points || 0), 0),
    [questions]
  );

  useEffect(() => {
    if (!quiz) {
      return;
    }
    if (quiz.points !== computedPoints) {
      setQuiz((current) => (current ? { ...current, points: computedPoints } : current));
    }
  }, [quiz, computedPoints]);

  const onSaveQuiz = async (publishAfterSave: boolean) => {
    if (!quiz) {
      return;
    }
    setSaving(true);
    try {
      const updated = await client.updateQuiz({
        ...quiz,
        points: computedPoints,
      });
      if (publishAfterSave && !updated.published) {
        await client.setQuizPublished(updated._id, true);
        router.push(`/courses/${cid}/quizzes`);
        return;
      }
      setQuiz(updated);
      router.push(`/courses/${cid}/quizzes/${qid}`);
    } finally {
      setSaving(false);
    }
  };

  const onCreateQuestion = async () => {
    const created = await client.createQuestion(
      qid,
      defaultQuestionForType(newQuestionType)
    );
    setQuestions((current) => [...current, created]);
    setActiveTab("questions");
  };

  const onSaveQuestion = async (question: QuizQuestion) => {
    const updated = await client.updateQuestion(question);
    setQuestions((current) =>
      current.map((q) => (q._id === updated._id ? updated : q))
    );
  };

  const onDeleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    setQuestions((current) => current.filter((question) => question._id !== questionId));
  };

  if (loading) {
    return <p>Loading quiz editor...</p>;
  }

  if (!quiz) {
    return <p className="text-danger">Unable to load quiz editor.</p>;
  }

  return (
    <div id="wd-quiz-editor">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Quiz Editor</h2>
        <Badge bg={quiz.published ? "success" : "secondary"}>
          {quiz.published ? "Published" : "Unpublished"}
        </Badge>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key ?? "details")}
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <Card className="p-3">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={quiz.description ?? ""}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              />
            </Form.Group>

            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.quizType}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      quizType: e.target.value as Quiz["quizType"],
                    })
                  }
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      assignmentGroup: e.target.value as Quiz["assignmentGroup"],
                    })
                  }
                >
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Points (sum of questions)</Form.Label>
                <Form.Control value={computedPoints} disabled />
              </Col>
              <Col md={6}>
                <Form.Label>Time Limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      timeLimit: Number(e.target.value || 0),
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="multiple-attempts"
                  label="Multiple Attempts"
                  checked={quiz.multipleAttempts}
                  onChange={(e) =>
                    setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label>How Many Attempts</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={quiz.howManyAttempts}
                  disabled={!quiz.multipleAttempts}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      howManyAttempts: Math.max(1, Number(e.target.value || 1)),
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  value={quiz.accessCode ?? ""}
                  onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Control
                  value={quiz.showCorrectAnswers ?? ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="shuffle-answers"
                  label="Shuffle Answers"
                  checked={quiz.shuffleAnswers}
                  onChange={(e) =>
                    setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="one-question-at-a-time"
                  label="One Question at a Time"
                  checked={quiz.oneQuestionAtATime}
                  onChange={(e) =>
                    setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="webcam-required"
                  label="Webcam Required"
                  checked={quiz.webcamRequired}
                  onChange={(e) =>
                    setQuiz({ ...quiz, webcamRequired: e.target.checked })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="lock-after-answer"
                  label="Lock Questions After Answering"
                  checked={quiz.lockQuestionsAfterAnswering}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      lockQuestionsAfterAnswering: e.target.checked,
                    })
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatDateTimeLocal(quiz.dueDate)}
                  onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Available Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatDateTimeLocal(quiz.availableDate)}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableDate: e.target.value })
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Label>Until Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatDateTimeLocal(quiz.untilDate)}
                  onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                />
              </Col>
            </Row>
          </Card>
        </Tab>

        <Tab eventKey="questions" title={`Questions (${questions.length})`}>
          <Card className="p-3 mb-3">
            <div className="d-flex gap-2 align-items-center">
              <Form.Select
                value={newQuestionType}
                onChange={(e) =>
                  setNewQuestionType(e.target.value as QuizQuestion["type"])
                }
                style={{ maxWidth: 260 }}
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="FILL_IN_BLANK">Fill in Blank</option>
              </Form.Select>
              <Button variant="secondary" onClick={onCreateQuestion}>
                New Question
              </Button>
            </div>
          </Card>

          <ListGroup>
            {questions.map((question) => (
              <ListGroup.Item key={question._id}>
                <Row className="g-3">
                  <Col md={7}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={question.title}
                      onChange={(e) =>
                        setQuestions((current) =>
                          current.map((q) =>
                            q._id === question._id ? { ...q, title: e.target.value } : q
                          )
                        )
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      value={question.type}
                      onChange={(e) =>
                        setQuestions((current) =>
                          current.map((q) =>
                            q._id === question._id
                              ? {
                                  ...q,
                                  ...defaultQuestionForType(
                                    e.target.value as QuizQuestion["type"]
                                  ),
                                  _id: q._id,
                                  quiz: q.quiz,
                                }
                              : q
                          )
                        )
                      }
                    >
                      <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                      <option value="TRUE_FALSE">True/False</option>
                      <option value="FILL_IN_BLANK">Fill in Blank</option>
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      value={question.points}
                      onChange={(e) =>
                        setQuestions((current) =>
                          current.map((q) =>
                            q._id === question._id
                              ? { ...q, points: Number(e.target.value || 0) }
                              : q
                          )
                        )
                      }
                    />
                  </Col>
                  <Col md={12}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={question.question}
                      onChange={(e) =>
                        setQuestions((current) =>
                          current.map((q) =>
                            q._id === question._id
                              ? { ...q, question: e.target.value }
                              : q
                          )
                        )
                      }
                    />
                  </Col>

                  {question.type === "MULTIPLE_CHOICE" && (
                    <>
                      <Col md={8}>
                        <Form.Label>Choices (one per line)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={question.choices.join("\n")}
                          onChange={(e) =>
                            setQuestions((current) =>
                              current.map((q) =>
                                q._id === question._id
                                  ? { ...q, choices: parseLines(e.target.value) }
                                  : q
                              )
                            )
                          }
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label>Correct Choice Index</Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          value={question.correctChoice}
                          onChange={(e) =>
                            setQuestions((current) =>
                              current.map((q) =>
                                q._id === question._id
                                  ? {
                                      ...q,
                                      correctChoice: Math.max(
                                        0,
                                        Number(e.target.value || 0)
                                      ),
                                    }
                                  : q
                              )
                            )
                          }
                        />
                      </Col>
                    </>
                  )}

                  {question.type === "TRUE_FALSE" && (
                    <Col md={4}>
                      <Form.Label>Correct Answer</Form.Label>
                      <Form.Select
                        value={question.correctTrueFalse ? "true" : "false"}
                        onChange={(e) =>
                          setQuestions((current) =>
                            current.map((q) =>
                              q._id === question._id
                                ? { ...q, correctTrueFalse: e.target.value === "true" }
                                : q
                            )
                          )
                        }
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Col>
                  )}

                  {question.type === "FILL_IN_BLANK" && (
                    <Col md={8}>
                      <Form.Label>Accepted Answers (one per line)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={question.blankAnswers.join("\n")}
                        onChange={(e) =>
                          setQuestions((current) =>
                            current.map((q) =>
                              q._id === question._id
                                ? { ...q, blankAnswers: parseLines(e.target.value) }
                                : q
                            )
                          )
                        }
                      />
                    </Col>
                  )}

                  <Col md={12} className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-danger"
                      onClick={() => void onDeleteQuestion(question._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => void onSaveQuestion(question)}
                    >
                      Save Question
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => void onSaveQuiz(false)}
          disabled={saving}
        >
          Save
        </Button>
        <Button variant="danger" onClick={() => void onSaveQuiz(true)} disabled={saving}>
          Save and Publish
        </Button>
      </div>
    </div>
  );
}
