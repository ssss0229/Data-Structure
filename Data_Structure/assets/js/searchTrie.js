class TrieNode {
    constructor() {
        this.children = {};
        this.results = [];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, data) {
        let node = this.root;
        for (const ch of word.toLowerCase()) {
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }
            node = node.children[ch];
        }
        node.results.push(data);
    }

    startsWith(prefix) {
        let node = this.root;
        for (const ch of prefix.toLowerCase()) {
            if (!node.children[ch]) return [];
            node = node.children[ch];
        }
        return this._collect(node);
    }

    _collect(node) {
        let res = [...node.results];
        for (const ch in node.children) {
            res = res.concat(this._collect(node.children[ch]));
        }
        return res;
    }
}

export { Trie };
