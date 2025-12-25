// quizMain.js
import { pickRandomQuizzes } from "./quizSelector.js";
import { setQuizzes } from "./quizEngine.js";
import { renderQuiz } from "./quizUI.js";

export function initQuizPage(category) {
    const questions = pickRandomQuizzes(category);
    setQuizzes(questions);
    renderQuiz(questions[0]);
}

// all.html 처럼 인자 없이 스크립트가 실행되는 경우를 위한 기본 실행 로직
const path = window.location.pathname;
if (path.includes("all.html")) {
    initQuizPage("all");
}