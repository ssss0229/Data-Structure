// assets/js/search.js
import { Trie } from "./Trie.js";
import { searchData } from "./searchData.js";

const trie = new Trie();
const urlMap = {};

// Trie 구성
searchData.forEach(item => {
    trie.insert(item.word);
    urlMap[item.word] = item.url;
});

const input = document.getElementById("search-input");
const list = document.getElementById("search-results");

input.addEventListener("input", () => {
    const value = input.value.trim();
    list.innerHTML = "";

    if (!value) {
        list.style.display = "none";
        return;
    }

    const results = trie.startsWith(value);

    results.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;

        li.onclick = () => {
            window.location.href = urlMap[word];
        };

        list.appendChild(li);
    });

    list.style.display = results.length ? "block" : "none";
});
