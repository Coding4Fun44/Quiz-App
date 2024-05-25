import React from "react";
import { Link } from "react-router-dom";

const Result = ({
  total,
  finalScore,
  finalQuestions,
  finalWrongAnswers,
  finalRealAnswers,
}) => {
  let totalScore = 0;
  return (
    <div>
      {finalScore.map((score) => {
        totalScore = totalScore + score;
      })}
      <h1>
        Your Score: {totalScore}/{total}
      </h1>
      <p>Here is what you got wrong:</p>
      {finalQuestions.map((question, index) => {
        if (question !== null) {
          return (
            <div key={index}>
              {question && <h2>Question: {question}</h2>}
              {finalWrongAnswers[index] && (
                <h2>Your Answer: {finalWrongAnswers[index]}</h2>
              )}
              {finalRealAnswers[index] && (
                <h2>Correct Answer: {finalRealAnswers[index]}</h2>
              )}
              <hr />
            </div>
          );
        }
      })}
      <Link to="/">
        <div className="home-button">
          <button className="home">Back to Main Menu</button>
        </div>
      </Link>
    </div>
  );
};

export default Result;
