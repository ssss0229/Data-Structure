// quizData.js
export const quizData = {
    linear: {
        simple_mcq: [
            {
                question: "뒤로 가기 기능을 구현하는 데 가장 적절한 자료구조는?",
                answer: "스택",
                choices: ["배열", "큐", "스택", "트리"],
                explanation: "스택은 LIFO 구조이기 때문에 최근 페이지부터 되돌아갈 수 있다."
            },
            {
                question: "순서대로 처리해야 하는 작업에 적합한 자료구조는?",
                answer: "큐",
                choices: ["스택", "큐", "해시", "트리"],
                explanation: "큐는 FIFO 구조로 먼저 들어온 데이터가 먼저 처리된다."
            }
        ],

        simple_subjective: [
            {
                question: "선형 자료구조 중 LIFO 구조를 가지는 것은?",
                answer: "스택",
                choices: [],
                explanation: "LIFO(Last In First Out)는 스택의 핵심 특징이다."
            },
            {
                question: "FIFO 구조를 가지는 자료구조는?",
                answer: "큐",
                choices: [],
                explanation: "큐는 먼저 들어온 데이터가 먼저 나간다."
            }
        ],

        situation_mcq: [
            {
                question: "틀린 문제를 틀린 순서대로 다시 풀게 하려면 어떤 자료구조가 적절한가?",
                answer: "큐",
                choices: ["스택", "큐", "배열", "트리"],
                explanation: "큐를 사용하면 틀린 순서 그대로 다시 처리할 수 있다."
            },
            {
                question: "실행 취소(Undo) 기능에 가장 적합한 자료구조는?",
                answer: "스택",
                choices: ["큐", "스택", "해시", "그래프"],
                explanation: "가장 최근 작업부터 취소해야 하므로 스택이 적합하다."
            }
        ],

        ox: [
            {
                question: "스택은 FIFO 구조이다.",
                answer: "X",
                choices: ["O", "X"],
                explanation: "스택은 LIFO 구조이다."
            },
            {
                question: "큐는 먼저 들어온 데이터가 먼저 처리된다.",
                answer: "O",
                choices: ["O", "X"],
                explanation: "큐는 FIFO 구조이다."
            }
        ],

        compare_mcq: [
            {
                question: "스택과 큐의 가장 큰 차이점은?",
                answer: "데이터 처리 순서",
                choices: [
                    "메모리 사용량",
                    "데이터 처리 순서",
                    "정렬 여부",
                    "탐색 속도"
                ],
                explanation: "스택은 LIFO, 큐는 FIFO 구조를 가진다."
            },
            {
                question: "배열과 큐의 차이로 가장 적절한 것은?",
                answer: "큐는 순서를 보장한다",
                choices: [
                    "배열은 순서를 가진다",
                    "큐는 순서를 보장한다",
                    "배열은 FIFO이다",
                    "큐는 랜덤 접근이 가능하다"
                ],
                explanation: "큐는 들어온 순서대로 처리하는 것이 핵심이다."
            }
        ]
    },

    nonlinear: {
        simple_mcq: [
            {
                question: "자동 완성 기능에 가장 적합한 자료구조는?",
                answer: "트라이",
                choices: ["트리", "트라이", "그래프", "해시"],
                explanation: "트라이는 문자열 접두사를 효율적으로 처리한다."
            },
            {
                question: "사이트의 페이지 계층 구조를 표현하기 적합한 자료구조는?",
                answer: "트리",
                choices: ["그래프", "트리", "해시", "큐"],
                explanation: "트리는 부모-자식 관계를 표현하는 데 적합하다."
            }
        ],

        simple_subjective: [
            {
                question: "접두사 검색에 특화된 자료구조는?",
                answer: "트라이",
                choices: [],
                explanation: "문자 단위로 분기하는 구조이기 때문이다."
            },
            {
                question: "계층 구조를 표현하는 대표적인 자료구조는?",
                answer: "트리",
                choices: [],
                explanation: "상위-하위 구조를 자연스럽게 표현할 수 있다."
            }
        ],

        situation_mcq: [
            {
                question: "검색어 추천 기능에 적절한 자료구조는?",
                answer: "트라이",
                choices: ["해시", "트리", "트라이", "그래프"],
                explanation: "입력 중인 문자열을 기준으로 탐색할 수 있다."
            },
            {
                question: "웹사이트 메뉴 구조를 표현하기 적절한 자료구조는?",
                answer: "트리",
                choices: ["그래프", "큐", "트리", "배열"],
                explanation: "계층적 구조이기 때문이다."
            }
        ],

        ox: [
            {
                question: "트라이는 문자열 자동 완성에 적합하다.",
                answer: "O",
                choices: ["O", "X"],
                explanation: "접두사 기반 탐색이 가능하다."
            },
            {
                question: "그래프는 계층 구조 표현에 가장 적합하다.",
                answer: "X",
                choices: ["O", "X"],
                explanation: "계층 구조는 트리가 더 적합하다."
            }
        ],

        compare_mcq: [
            {
                question: "트리와 그래프의 차이로 옳은 것은?",
                answer: "트리는 사이클이 없다",
                choices: [
                    "그래프는 항상 계층 구조이다",
                    "트리는 사이클이 없다",
                    "트리는 모든 노드가 연결된다",
                    "그래프는 방향이 없다"
                ],
                explanation: "트리는 사이클이 없는 구조이다."
            },
            {
                question: "트라이와 해시의 차이로 적절한 것은?",
                answer: "트라이는 접두사 검색이 가능하다",
                choices: [
                    "해시는 접두사 검색이 가능하다",
                    "트라이는 접두사 검색이 가능하다",
                    "트라이는 O(n) 탐색이다",
                    "해시는 문자열에 부적합하다"
                ],
                explanation: "트라이는 접두사 단위 탐색이 가능하다."
            }
        ]
    }
};
