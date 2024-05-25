import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Quiz = ({ quiz, updateScore, wrongAnswer }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(quiz.length).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(
    Array(quiz.length).fill(null)
  );
  const [questions, setQuestions] = useState(Array(quiz.length).fill(null));
  const [wrongAnswers, setWrongAnswers] = useState(
    Array(quiz.length).fill(null)
  );
  const [realAnswers, setRealAnswers] = useState(Array(quiz.length).fill(null));
  const currentQuestion = quiz[currentQuestionIndex];
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const nextQuestion = () => {
    if (selectedOption !== null) {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      alert("Please select an answer.");
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  function formatText(question) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = question;
    return textArea.value;
  }

  useEffect(() => {
    const options = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    setShuffledOptions(shuffleArray(options));
    setSelectedOption(answers[currentQuestionIndex]);
  }, [currentQuestionIndex, quiz]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option;
    setAnswers(updatedAnswers);

    const updateCorrectAnswers = () => {
      const updatedCorrectAnswers = [...correctAnswers];
      updatedCorrectAnswers[currentQuestionIndex] =
        option === currentQuestion.correct_answer ? 1 : 0;
      setCorrectAnswers(updatedCorrectAnswers);
      return updatedCorrectAnswers;
    };

    const updateQuestions = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] =
        option === currentQuestion.correct_answer
          ? null
          : formatText(currentQuestion.question);
      setQuestions(updatedQuestions);
      return updatedQuestions;
    };

    const updateWrongAnswers = () => {
      const updatedWrongAnswers = [...wrongAnswers];
      updatedWrongAnswers[currentQuestionIndex] =
        option === currentQuestion.correct_answer ? null : formatText(option);
      setWrongAnswers(updatedWrongAnswers);
      return updatedWrongAnswers;
    };

    const updateRealAnswers = () => {
      const updatedRealAnswers = [...realAnswers];
      updatedRealAnswers[currentQuestionIndex] =
        option === currentQuestion.correct_answer
          ? null
          : formatText(currentQuestion.correct_answer);
      setRealAnswers(updatedRealAnswers);
      return updatedRealAnswers;
    };

    const updatedCorrectAnswers = updateCorrectAnswers();
    const updatedQuestions = updateQuestions();
    const updatedWrongAnswers = updateWrongAnswers();
    const updatedRealAnswers = updateRealAnswers();

    updateScore(updatedCorrectAnswers);
    wrongAnswer(
      currentQuestionIndex,
      updatedQuestions,
      updatedWrongAnswers,
      updatedRealAnswers
    );
    console.log(answers);
    console.log(updatedCorrectAnswers);
    console.log(updatedQuestions);
    console.log(updatedWrongAnswers);
    console.log(updatedRealAnswers);
  };

  return (
    <div>
      {currentQuestion && (
        <div className="container">
          <h1 className="question">
            {currentQuestionIndex + 1}. {formatText(currentQuestion.question)}
          </h1>
          <div className="options">
            <ul className="list">
              {shuffledOptions.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    {formatText(option)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="buttons">
        {currentQuestionIndex > 0 ? (
          <button className="back" onClick={prevQuestion}>
            Back
          </button>
        ) : (
          <Link to="/">
            <button className="back">Back to Main Menu</button>
          </Link>
        )}
        {currentQuestionIndex < quiz.length - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        ) : answers[currentQuestionIndex] !== null ? (
          <Link to="/results" className="link-results">
            <button className="results" onClick={nextQuestion}>
              Results
            </button>
          </Link>
        ) : (
          <button className="results" onClick={nextQuestion}>
            Results
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
