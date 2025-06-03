// src/components/Quiz.tsx
import { useEffect, useState } from "react";
import "./Quiz.css";

type Question = {
  question: string;
  correct_answer: string;
};

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ right: 0, wrong: 0 });

  useEffect(() => {
    fetch("sample.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleAnswer = (answer: string) => {
    const correct = questions[currentIndex].correct_answer;
    setScore((prev) => ({
      right: answer === correct ? prev.right + 1 : prev.right,
      wrong: answer !== correct ? prev.wrong + 1 : prev.wrong,
    }));
    setCurrentIndex((prev) => prev + 1);
  };

  if (questions.length === 0) return <p>Loading...</p>;

  if (currentIndex >= questions.length)
    return (
      <div className="quiz">
        <h1>Quiz Completed!</h1>
        <p className="score">Your final score is: {score.right}/10</p>
      </div>
    );

  const question = decodeHTML(questions[currentIndex].question);

  return (
    <div className="quiz">
      <h1 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="btns">
        <button className="answer-btn" onClick={() => handleAnswer("True")}>
          <img src="/true.png" alt="True" />
        </button>
        <button className="answer-btn" onClick={() => handleAnswer("False")}>
          <img src="/false.png" alt="False" />
        </button>
      </div>
      <p className="score">
        Score: Right: {score.right} Wrong: {score.wrong}
      </p>
    </div>
  );
};

export default Quiz;
