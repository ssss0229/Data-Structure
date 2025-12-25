import { Trie } from "./Trie.js";

const input = document.getElementById("inputValue");
const result = document.getElementById("result");
const svg = document.getElementById("trieSvg");

let trie = new Trie();
const undoStack = [];

/* ---------- 제한 ---------- */
const MAX_WORD_LEN = 10;
const MAX_WORD_COUNT = 20;

/* ---------- 시각화 상수 ---------- */
const NODE_RADIUS = 18;
const LEVEL_GAP = 65;
const SIBLING_GAP = 45;

/* ---------- 상태 저장 ---------- */
function saveState() {
    undoStack.push(trie.clone());
}

/* ---------- 단어 추가 ---------- */
window.insertWord = function () {
    const word = input.value.trim().toLowerCase();
    if (!word) return;

    if (word.length > MAX_WORD_LEN) {
        result.textContent = `단어 길이는 최대 ${MAX_WORD_LEN}자`;
        return;
    }

    const count = trie.startsWith("").length;
    if (count >= MAX_WORD_COUNT) {
        result.textContent = `최대 단어 개수는 ${MAX_WORD_COUNT}개`;
        return;
    }

    saveState();
    trie.insert(word);

    render();
    result.textContent = `'${word}' 추가됨`;
};

/* ---------- 단어 삭제 ---------- */
window.deleteWord = function () {
    const word = input.value.trim().toLowerCase();
    if (!word) return;

    if (!trie.search(word)) {
        result.textContent = `'${word}' 없음`;
        return;
    }

    saveState();
    trie.delete(word);

    render();
    result.textContent = `'${word}' 삭제됨`;
};

/* ---------- 단어 탐색 ---------- */
window.searchWord = function () {
    const word = input.value.trim().toLowerCase();
    if (!word) return;

    result.textContent = trie.search(word)
        ? `'${word}' 존재`
        : `'${word}' 없음`;
};

/* ---------- 접두사 탐색 ---------- */
window.prefixSearch = function () {
    const prefix = input.value.trim().toLowerCase();
    if (!prefix) return;

    const found = trie.startsWith(prefix);
    result.textContent = found.length
        ? `접두사 결과: ${found.join(", ")}`
        : "접두사 결과 없음";
};

/* ---------- 되돌리기 ---------- */
window.undo = function () {
    if (undoStack.length === 0) {
        result.textContent = "되돌릴 수 없음";
        return;
    }

    trie = undoStack.pop();
    render();
    result.textContent = "이전 상태로 복원";
};

/* =================================================
   ================= Trie 시각화 ===================
   ================================================= */

function render() {
    svg.innerHTML = "";

    const positions = new Map();
    let leafX = 0;

    /* ---------- 1. 좌표 계산 (DFS) ---------- */
    function layout(node, depth) {
        const keys = Object.keys(node.children);

        if (keys.length === 0) {
            const x = ++leafX * SIBLING_GAP + 40;
            positions.set(node, { x, y: depth * LEVEL_GAP + 40 });
            return x;
        }

        const childXs = [];
        for (const ch of keys) {
            childXs.push(layout(node.children[ch], depth + 1));
        }

        const x = childXs.reduce((a, b) => a + b) / childXs.length;
        positions.set(node, { x, y: depth * LEVEL_GAP + 40 });
        return x;
    }

    layout(trie.root, 0);

    /* ---------- 2. 간선 ---------- */
    function drawEdges(node) {
        const from = positions.get(node);

        for (const ch in node.children) {
            const child = node.children[ch];
            const to = positions.get(child);

            const line = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );
            line.setAttribute("x1", from.x);
            line.setAttribute("y1", from.y);
            line.setAttribute("x2", to.x);
            line.setAttribute("y2", to.y);
            line.setAttribute("stroke", "#9ca3af");
            svg.appendChild(line);

            drawEdges(child);
        }
    }

    /* ---------- 3. 노드 ---------- */
    function drawNodes(node, char = "Root") {
        const { x, y } = positions.get(node);

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", NODE_RADIUS);
        circle.setAttribute(
            "fill",
            node.isEnd ? "#3b82f6" : "#e5e7eb"
        );
        circle.setAttribute("stroke", "#374151");
        svg.appendChild(circle);

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        text.setAttribute("x", x);
        text.setAttribute("y", y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "13");
        text.setAttribute("font-weight", "bold");
        text.setAttribute(
            "fill",
            node.isEnd ? "white" : "#111827"
        );
        text.textContent = char;
        svg.appendChild(text);

        for (const ch in node.children) {
            drawNodes(node.children[ch], ch);
        }
    }

    drawEdges(trie.root);
    drawNodes(trie.root);

    /* ---------- 4. viewBox 자동 조정 ---------- */
    const nodes = [...svg.querySelectorAll("circle")];
    if (nodes.length === 0) return;

    const xs = nodes.map(n => +n.getAttribute("cx"));
    const ys = nodes.map(n => +n.getAttribute("cy"));

    const minX = Math.min(...xs) - 40;
    const maxX = Math.max(...xs) + 40;
    const minY = Math.min(...ys) - 40;
    const maxY = Math.max(...ys) + 40;

    svg.setAttribute(
        "viewBox",
        `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
    );
}
