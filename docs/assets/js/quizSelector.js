// quizSelector.js
import { quizData } from "./quizData.js";

export function pickRandomQuizzes(category = "all") {
    const types = ["simple_mcq", "simple_subjective", "situation_mcq", "compare_mcq", "ox"];
    let selectedQuizzes = [];

    types.forEach(type => {
        let pool = [];
        if (category === "all") {
            pool = [...(quizData.linear[type] || []), ...(quizData.nonlinear[type] || [])];
        } else {
            // "linear" 또는 "nonlinear" 카테고리에서만 추출
            pool = quizData[category][type] || [];
        }

        const shuffled = pool.sort(() => Math.random() - 0.5);
        selectedQuizzes.push(...shuffled.slice(0, 2));
    });

    return selectedQuizzes.sort(() => Math.random() - 0.5);
}