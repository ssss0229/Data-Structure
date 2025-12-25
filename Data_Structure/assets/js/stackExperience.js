// ../assets/js/stackExperience.js
import { HistoryStack } from "./historyStack.js";

const STACK_SIZE = 8;
let stack = [];
const history = new HistoryStack();

const stackView = document.getElementById("stackView");
const result = document.getElementById("result");
const input = document.getElementById("inputValue");


function updateTopLabel() {
    const topLabel = document.getElementById("topLabel");

    if (stack.length === 0) {
        // 스택이 비어 있으면 맨 아래로
        topLabel.style.visibility = "hidden";
        return;
    }

    topLabel.style.visibility = "visible";

    // column-reverse 이므로 인덱스 그대로 사용
    const topIndex = stack.length - 1;

    // cell 높이(48) + gap(8)
    const offset = topIndex * 56;

    topLabel.style.transform = `translateY(${-offset}px)`;
}

function renderStack() {
    stackView.innerHTML = "";

    for (let i = 0; i < STACK_SIZE; i++) {
        const item = document.createElement("div");
        item.className = "array-item";

        const cell = document.createElement("div");
        cell.className = "array-cell";

        if (i < stack.length) {
            cell.textContent = stack[i];
            cell.classList.add("filled");
        } else {
            cell.classList.add("empty");
        }

        item.appendChild(cell);
        stackView.appendChild(item);
    }

    updateTopLabel();
}

/* === 스택 연산 === */

function push() {
    if (stack.length >= STACK_SIZE) {
        result.textContent = "Stack Overflow";
        return;
    }

    if (input.value === "") {
        result.textContent = "값을 입력하세요";
        return;
    }

    history.save(stack);
    stack.push(input.value);

    result.textContent = `push: ${input.value}`;
    input.value = "";
    renderStack();
}

function pop() {
    if (stack.length === 0) {
        result.textContent = "Stack Underflow";
        return;
    }

    history.save(stack);
    const value = stack.pop();

    result.textContent = `pop: ${value}`;
    renderStack();
}

function peek() {
    if (stack.length === 0) {
        result.textContent = "스택이 비어 있습니다";
        return;
    }

    result.textContent = `top: ${stack[stack.length - 1]}`;
}

function isEmpty() {
    result.textContent =
        stack.length === 0 ? "true (비어 있음)" : "false (요소 있음)";
}

function undo() {
    const prev = history.undo();
    if (!prev) {
        result.textContent = "되돌릴 작업이 없습니다";
        return;
    }

    stack = prev;
    result.textContent = "이전 상태로 되돌림";
    renderStack();
}

/* === HTML에서 onclick으로 쓰기 위해 전역 등록 === */
window.push = push;
window.pop = pop;
window.peek = peek;
window.isEmpty = isEmpty;
window.undo = undo;

/* 초기 렌더 */
renderStack();
