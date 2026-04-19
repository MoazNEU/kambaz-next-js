import { axiosWithCredentials } from "../axios";
import { apiUrl } from "../httpServer";

export type QuizAvailability = {
  state: "NOT_AVAILABLE" | "CLOSED" | "AVAILABLE";
  label: string;
  canTake: boolean;
};

export type Quiz = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published: boolean;
  points?: number;
  questionCount?: number;
  score?: number | null;
  availability?: QuizAvailability;
};

export type QuizQuestion = {
  _id: string;
  quiz: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  question: string;
  choices: string[];
  correctChoice: number;
  correctTrueFalse: boolean;
  blankAnswers: string[];
};

export type AttemptAnswer = {
  question: string;
  answer: string | number | boolean;
  correct: boolean;
  pointsEarned: number;
  pointsPossible: number;
  correctAnswer: string | number | boolean | string[];
};

export type QuizAttempt = {
  _id: string;
  quiz: string;
  student: string;
  attemptNumber: number;
  score: number;
  totalPoints: number;
  submittedAt: string;
  answers: AttemptAnswer[];
};

const COURSES_API = apiUrl("/api/courses");
const QUIZZES_API = apiUrl("/api/quizzes");
const QUESTIONS_API = apiUrl("/api/questions");

export async function findQuizzesForCourse(courseId: string): Promise<Quiz[]> {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
}

export async function createQuiz(courseId: string, quiz: Partial<Quiz>): Promise<Quiz> {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
}

export async function findQuizById(quizId: string): Promise<Quiz> {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
}

export async function updateQuiz(quiz: Quiz): Promise<Quiz> {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
}

export async function deleteQuiz(quizId: string): Promise<void> {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
}

export async function setQuizPublished(
  quizId: string,
  published: boolean
): Promise<Quiz> {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`, {
    published,
  });
  return response.data;
}

export async function findQuestionsForQuiz(quizId: string): Promise<QuizQuestion[]> {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
}

export async function createQuestion(
  quizId: string,
  question: Partial<QuizQuestion>
): Promise<QuizQuestion> {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
}

export async function updateQuestion(
  question: QuizQuestion
): Promise<QuizQuestion> {
  const response = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return response.data;
}

export async function deleteQuestion(questionId: string): Promise<void> {
  await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
}

export async function submitAttempt(
  quizId: string,
  payload: {
    preview?: boolean;
    accessCode?: string;
    answers: { question: string; answer: string | number | boolean }[];
  }
): Promise<QuizAttempt | { preview: true; score: number; totalPoints: number; answers: AttemptAnswer[] }> {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    payload
  );
  return response.data;
}

export async function findLatestAttempt(quizId: string): Promise<QuizAttempt | null> {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/latest`,
    {
      validateStatus: (status) => status === 200 || status === 404,
    }
  );
  if (response.status === 404) {
    return null;
  }
  return response.data;
}
