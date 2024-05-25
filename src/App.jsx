import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Quiz from "./Quiz";
import Home from "./Home";
import Result from "./Result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [score, setScore] = useState(Array(1).fill(null));

  const generateQuiz = (url, navigate) => {
    axios.get(url).then((response) => {
      setSelectedQuiz(response.data);
      response.data &&
      response.data.results &&
      response.data.results.length !== 0
        ? navigate("/quiz")
        : alert("Unable to generate quiz. Try using different filters.");
    });
    console.log(url);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const [questions, setQuestions] = useState(Array(1).fill(null));
  const [wrongAnswers, setWrongAnswers] = useState(Array(1).fill(null));

  const [realAnswers, setRealAnswers] = useState(Array(1).fill(null));

  const wrongAnswer = (index, question, selectedAnswer, correctAnswer) => {
    setQuestions(question);
    setWrongAnswers(selectedAnswer);
    setRealAnswers(correctAnswer);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Home generateQuiz={generateQuiz} quiz={selectedQuiz} />}
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quiz
                quiz={selectedQuiz.results}
                updateScore={updateScore}
                wrongAnswer={wrongAnswer}
              ></Quiz>
            }
          ></Route>
          {selectedQuiz && selectedQuiz.results && (
            <Route
              path="/results"
              element={
                <Result
                  total={selectedQuiz.results.length}
                  finalScore={score}
                  finalQuestions={questions}
                  finalWrongAnswers={wrongAnswers}
                  finalRealAnswers={realAnswers}
                ></Result>
              }
            ></Route>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
