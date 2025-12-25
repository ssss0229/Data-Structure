import { 
    getScore, hasWrongQuizzes, getNextWrongQuiz, 
    submitAnswer, hasNextQuiz, getCurrentQuiz, 
    getWrongCount, reEnqueueWrong, setRetryMode, getRetryMode 
} from "./quizEngine.js";

let currentQuestionNum = 1;
let totalQuestions = 10; 
let itemsToProcess = 0; // ⭐ 이번 오답 풀이 회차에서 처리할 문제 수를 저장하는 변수

export function renderQuiz(quiz) {
    if (!quiz) return;

    const progressEl = document.getElementById("progress");
    if (progressEl) {
        const modeText = getRetryMode() ? "오답 재풀이" : "문제";
        // 오답 풀이 중에는 고정된 itemsToProcess를 분모로 사용
        const displayTotal = getRetryMode() ? itemsToProcess : totalQuestions;
        progressEl.innerText = `${modeText}: ${currentQuestionNum} / ${displayTotal}`;
    }

    const questionText = document.getElementById("question-text");
    const choicesBox = document.getElementById("choices-box");
    const subjectiveBox = document.getElementById("subjective-box");
    const explanationBox = document.getElementById("explanation-box");

    questionText.innerText = quiz.question;
    choicesBox.innerHTML = ""; 
    subjectiveBox.classList.add("hidden");
    explanationBox.classList.add("hidden");
    
    // 입력창 및 버튼 상태 초기화
    const input = document.getElementById("subjective-input");
    const submitBtn = document.getElementById("submit-subjective");
    if (input) {
        input.disabled = false;
        input.readOnly = false;
        input.value = "";
        input.style.opacity = "1";
    }
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    }

    const handler = getRetryMode() ? handleRetryAnswer : handleAnswer;

    if (quiz.choices && quiz.choices.length > 0) {
        quiz.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.innerText = choice;
            btn.className = "choice-btn";
            btn.onclick = () => handler(choice, quiz);
            choicesBox.appendChild(btn);
        });
    } else {
        subjectiveBox.classList.remove("hidden");
        input.onkeydown = (e) => { if (e.key === 'Enter') handler(input.value, quiz); };
        submitBtn.onclick = () => handler(input.value, quiz);
    }
}

function disableAllChoices() {
    const buttons = document.querySelectorAll(".choice-btn, #submit-subjective");
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
    });
    const input = document.getElementById("subjective-input");
    if (input) {
        input.readOnly = true;
        input.disabled = true;
        input.style.opacity = "0.6";
    }
}

// [일반 모드]
function handleAnswer(userAnswer, quiz) {
    if (!userAnswer.trim() && !quiz.choices.length) {
        alert("답을 입력해주세요!");
        return;
    }
    disableAllChoices();
    const isCorrect = userAnswer.trim() === quiz.answer;
    submitAnswer(userAnswer.trim());

    showExplanation(isCorrect, quiz.answer, quiz.explanation, () => {
        if (hasNextQuiz()) {
            currentQuestionNum++;
            renderQuiz(getCurrentQuiz());
        } else {
            showResult();
        }
    });
}

// [오답 모드] ⭐ 수정된 로직
function handleRetryAnswer(userAnswer, quiz) {
    if (!userAnswer.trim() && !quiz.choices.length) {
        alert("답을 입력해주세요!");
        return;
    }
    disableAllChoices();
    const isCorrect = userAnswer.trim() === quiz.answer;
    
    if (!isCorrect) {
        reEnqueueWrong(quiz); // 또 틀리면 큐의 맨 뒤로 보냄
    }

    showExplanation(isCorrect, quiz.answer, quiz.explanation, () => {
        // ⭐ 이번 회차에서 풀어야 할 문제를 다 풀었는지 체크
        if (currentQuestionNum < itemsToProcess) {
            const nextWrong = getNextWrongQuiz();
            if (nextWrong) {
                currentQuestionNum++;
                renderQuiz(nextWrong);
            } else {
                showResult();
            }
        } else {
            // ⭐ 정해진 개수를 다 채우면 무조건 결과창으로 이동
            showResult();
        }
    });
}

function showResult() {
    const quizBox = document.querySelector(".quiz-box");
    const explanationBox = document.getElementById("explanation-box");
    const progressEl = document.getElementById("progress");
    
    if (progressEl) progressEl.innerText = "결과";
    explanationBox.classList.add("hidden");

    const remainingCount = getWrongCount();
    const hasWrong = remainingCount > 0;

    quizBox.innerHTML = `
        <div class="result-screen">
            <h2>${hasWrong ? "아직 오답이 남았습니다!" : "완벽하게 완료!"}</h2>
            <p style="margin: 20px 0;">
                ${hasWrong ? `남은 오답: <strong>${remainingCount}</strong>개` : `축하합니다! 모든 문제를 맞히셨습니다.`}
            </p>
            <div class="result-buttons">
                ${hasWrong ? `<button id="retry-wrong-btn" class="btn-retry">남은 오답 다시 풀기</button>` : ""}
                <button onclick="location.href='index.html'" class="btn-home">처음으로 돌아가기</button>
            </div>
        </div>
    `;

    if (hasWrong) {
        document.getElementById("retry-wrong-btn").onclick = startWrongRetryMode;
    } else {
        setRetryMode(false);
    }
}

// ⭐ 오답 풀기 시작 시 회차 개수 고정
function startWrongRetryMode() {
    setRetryMode(true);
    currentQuestionNum = 1;
    itemsToProcess = getWrongCount(); // ⭐ 이 시점의 오답 수를 "이번 회차 한계치"로 고정
    
    const firstWrong = getNextWrongQuiz();
    if (firstWrong) {
        setupQuizLayout(); 
        renderQuiz(firstWrong);
    }
}

function showExplanation(isCorrect, correctAnswer, explanation, nextAction) {
    const explanationBox = document.getElementById("explanation-box");
    const explanationText = document.getElementById("explanation-text");
    const nextBtn = document.getElementById("next-btn");

    explanationBox.classList.remove("hidden");
    explanationText.innerHTML = `
        <strong style="color: ${isCorrect ? '#2ecc71' : '#e74c3c'}">
            ${isCorrect ? "정답입니다!" : "틀렸습니다. (정답: " + correctAnswer + ")"}
        </strong><br>
        <p class="exp-content">${explanation}</p>
    `;
    nextBtn.onclick = nextAction;
}

function setupQuizLayout() {
    const quizBox = document.querySelector(".quiz-box");
    quizBox.innerHTML = `
        <h2 id="question-text">문제 로딩 중...</h2>
        <div id="choices-box" class="choices"></div>
        <div id="subjective-box" class="subjective hidden">
            <input type="text" id="subjective-input" placeholder="정답을 입력하세요" />
            <button id="submit-subjective">제출</button>
        </div>
    `;
}