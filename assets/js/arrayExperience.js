import { HistoryStack } from "./historyStack.js";

const MAX_SIZE = 16;

document.addEventListener("DOMContentLoaded", () => {

    let arr = [1, 2, 3];
    const history = new HistoryStack();

    const arrayView = document.getElementById("array-view");
    const inputValue = document.getElementById("inputValue");
    const result = document.getElementById("result");

    function render() {
        const container = document.getElementById("array-view");
        container.innerHTML = "";

        for (let i = 0; i < MAX_SIZE; i++) {
            // 전체 묶음
            const item = document.createElement("div");
            item.className = "array-item";

            // 배열 칸
            const cell = document.createElement("div");
            cell.className = "array-cell";

            if (i < arr.length) {
                cell.textContent = arr[i];
                cell.classList.add("filled");
            } else {
                cell.textContent = "0"; // 공간 확보용 (숨김 처리됨)
                cell.classList.add("empty");
            }

            // 인덱스
            const index = document.createElement("div");
            index.className = "array-index";
            index.textContent = i;

            item.appendChild(cell);
            item.appendChild(index);
            container.appendChild(item);
        }
    }

    // 접근
    window.access = function () {
        const i = Number(inputValue.value);

        if (i < 0 || i >= arr.length) {
            result.textContent = "올바른 인덱스를 입력하세요.";
            return;
        }

        result.textContent = `인덱스 ${i}의 값은 ${arr[i]}입니다.`;
    };

    // 삽입
    window.insert = function () {
        if (arr.length >= MAX_SIZE) {
            result.textContent = "배열이 가득 찼습니다. (최대 16)";
            return;
        }

        history.save(arr);
        arr.push(Number(inputValue.value));
        render();
        result.textContent = "추가 완료";
    };

    // 인덱스로 삭제
    window.removeAt = function () {
        const i = Number(inputValue.value);

        if (i < 0 || i >= arr.length) {
            result.textContent = "올바른 인덱스를 입력하세요.";
            return;
        }

        history.save(arr);
        const removed = arr.splice(i, 1)[0];
        render();
        result.textContent = `인덱스 ${i}의 값 ${removed}가 삭제되었습니다.`;
    };

    // 뒤로가기
    window.undo = function () {
        const prev = history.undo();

        if (!prev) {
            result.textContent = "되돌릴 상태가 없습니다.";
            return;
        }

        arr = prev;
        render();
        result.textContent = "이전 상태로 되돌렸습니다.";
    };

    /* 최초 출력 */
    render();
});
