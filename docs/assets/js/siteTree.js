// siteTree.js 수정본
const siteTree = {
  id: "root",
  title: "자료 구조",
  url: "index.html", // 맨 앞의 / 를 제거
  children: [
    {
      id: "linear",
      title: "선형 구조",
      url: "linear/index.html", // 제거
      children: [
        { id: "array", title: "배열", url: "linear/array.html" },
        { id: "linked-list", title: "연결 리스트", url: "linear/linked-list.html" },
        { id: "stack", title: "스택", url: "linear/stack.html" },
        { id: "queue", title: "큐", url: "linear/queue.html" }
      ]
    },
    {
      id: "nonlinear",
      title: "비선형 구조",
      url: "nonlinear/index.html", // 제거
      children: [
        {
          id: "tree",
          title: "트리",
          url: "nonlinear/tree/tree.html", // 제거
          children: [
            { id: "binary-tree", title: "이진 트리", url: "nonlinear/tree/binary-tree.html" },
            { id: "trie", title: "트라이", url: "nonlinear/tree/trie.html" },
            { id: "heap", title: "힙", url: "nonlinear/tree/heap.html" }
          ]
        },
        {
          id: "graph",
          title: "그래프",
          url: "nonlinear/graph.html" // 제거
        }
      ]
    }
  ]
};
