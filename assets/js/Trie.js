export class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }
            node = node.children[ch];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return node.isEnd;
    }

    delete(word) {
        const remove = (node, depth) => {
            if (!node) return false;

            if (depth === word.length) {
                if (!node.isEnd) return false;
                node.isEnd = false;
                return Object.keys(node.children).length === 0;
            }

            const ch = word[depth];
            if (!node.children[ch]) return false;

            const shouldDeleteChild = remove(node.children[ch], depth + 1);

            if (shouldDeleteChild) {
                delete node.children[ch];
                return (
                    !node.isEnd &&
                    Object.keys(node.children).length === 0
                );
            }
            return false;
        };

        remove(this.root, 0);
    }

    startsWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) return [];
            node = node.children[ch];
        }

        const result = [];
        const dfs = (n, path) => {
            if (n.isEnd) result.push(path);
            for (const c in n.children) {
                dfs(n.children[c], path + c);
            }
        };
        dfs(node, prefix);
        return result;
    }

    clone() {
        const newTrie = new Trie();
        newTrie.root = this._cloneNode(this.root);
        return newTrie;
    }

    _cloneNode(node) {
        const newNode = new TrieNode();
        newNode.isEnd = node.isEnd;

        for (const ch in node.children) {
            newNode.children[ch] = this._cloneNode(node.children[ch]);
        }

        return newNode;
    }
}
