import "./Quiz.css";
import { reactData } from "../../assets/reactData";
import { useState } from "react";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [score, setScore] = useState(0);
  let [lock, setLock] = useState(false);
  let innerText = "";

  function handleCheck(event, answer) {
    if (lock === false) {
      if (event.target.innerText === answer) {
        setScore(score + 1);
        setLock(true);
        event.target.classList.add("correct");
      } else {
        event.target.classList.add("wrong");
        setLock(true);
        const correctAnswer = document.querySelector(".correct-answer");
        if (correctAnswer) {
          correctAnswer.classList.add("correct");
        }
      }
    }
  }

  function resetAnswerStyles() {
    const answers = document.querySelectorAll("li");
    answers.forEach((answer) => {
      answer.classList.remove("correct", "wrong");
    });
  }

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <hr />
      {index < reactData.length ? (
        <>
          <h2>
            {index + 1}. {reactData[index].question}
          </h2>
          <ul>
            {reactData[index].options.map((option, ind) => {
              return (
                <li
                  onClick={(event) => {
                    handleCheck(event, reactData[index].correctAnswer);
                  }}
                  key={ind}
                  className={
                    option === reactData[index].correctAnswer &&
                    "correct-answer"
                  }
                >
                  {option}
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              if (lock === true) {
                setIndex(index + 1);
                setLock(false);
                resetAnswerStyles();
              }
            }}
            className="next-btn"
          >
            Next
          </button>
          <div className="question-no">
            {index + 1} of {reactData.length} questions
          </div>
        </>
      ) : (
        <div className="show-result">
          <h3>
            Your result is : {score} out of {reactData.length} questions
          </h3>
          <button
            className="reset-btn"
            onClick={() => {
              setIndex(0);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
