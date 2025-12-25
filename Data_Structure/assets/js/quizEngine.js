import { quizData } from "./quizData.js";
import { pickRandomQuizzes } from "./quizSelector.js";
import { WrongQueue } from "./wrongQueue.js";

const wrongQueue = new WrongQueue();

let quizzes = [];
let index = 0;
let score = 0;
let isRetryMode = false; // 현재 오답 풀기 모드 상태

// 퀴즈 데이터 설정
export function setQuizzes(data) {
    quizzes = data;
    index = 0;
    score = 0;
    isRetryMode = false;
}

// 현재 문제 가져오기
export function getCurrentQuiz() {
    if (index >= quizzes.length) return null;
    return quizzes[index];
}

// 정답 체크 (일반 모드용)
export function submitAnswer(userAnswer) {
    const current = getCurrentQuiz();
    if (!current) return;

    if (userAnswer === current.answer) {
        score++;
    } else {
        wrongQueue.enqueue(current); // 틀리면 큐에 추가
    }
    index++;
}

// 오답 전용: 틀린 문제 다시 큐에 넣기
export function reEnqueueWrong(quiz) {
    wrongQueue.enqueue(quiz);
}

// 다음 문제 존재 여부
export function hasNextQuiz() {
    return index < quizzes.length;
}

// 모드 제어
export function setRetryMode(bool) {
    isRetryMode = bool;
}

export function getRetryMode() {
    return isRetryMode;
}

// 오답 관련 정보
export function hasWrongQuizzes() {
    return !wrongQueue.isEmpty();
}

export function getNextWrongQuiz() {
    return wrongQueue.dequeue();
}

export function getWrongCount() {
    return wrongQueue.queue.length;
}

export function getScore() {
    return score;
}