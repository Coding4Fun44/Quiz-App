import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const Home = ({ generateQuiz }) => {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.label);
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.label);
    setDifficulty(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.label);
    setType(event.target.value);
  };

  const categoryOptions = [
    { value: "", label: "Any" },
    { value: 9, label: "General Knowledge" },
    { value: 10, label: "Entertainment: Books" },
    { value: 11, label: "Entertainment: Film" },
    { value: 12, label: "Entertainment: Music" },
    { value: 13, label: "Entertainment: Musicals and Theatres" },
    { value: 14, label: "Entertainment: Television" },
    { value: 15, label: "Entertainment: Video Games" },
    { value: 16, label: "Entertainment: Board Games" },
    { value: 17, label: "Science and Nature" },
    { value: 18, label: "Science: Computers" },
    { value: 19, label: "Science: Mathematics" },
    { value: 20, label: "Mythology" },
    { value: 21, label: "Sports" },
    { value: 22, label: "Geography" },
    { value: 23, label: "History" },
    { value: 24, label: "Politics" },
    { value: 25, label: "Art" },
    { value: 26, label: "Celebraties" },
    { value: 27, label: "Animals" },
    { value: 28, label: "Vehicles" },
    { value: 29, label: "Entertainment: Comics" },
    { value: 30, label: "Science: Gadgets" },
    { value: 31, label: "Entertainment: Japanese Anime and Manga" },
    { value: 32, label: "Entertainment: Cartoon and Animations" },
  ];

  const difficultyOptions = [
    { value: "", label: "Any" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const typeOptions = [
    { value: "", label: "Any" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "boolean", label: "True/False" },
  ];

  let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  const handleGenerateQuiz = () => {
    generateQuiz(url, navigate);
  };

  return (
    <div className="container">
      <div className="top">
        <h1>Welcome to the quiz app!</h1>
        <p>Use the filters below to generate a quiz and test your knowledge!</p>
      </div>
      <div className="middle">
        <div className="amount-container">
          <h2 className="amount-text">Amount of Questions:</h2>
        </div>
        <div className="amount">
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            name="item"
            type="text"
            className="amountMenu"
          />
        </div>
        <div className="category-container">
          <h2 className="category-text">Category:</h2>
        </div>
        <div className="category">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="categoryMenu"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="difficulty-container">
          <h2 className="difficulty-text">Difficulty:</h2>
        </div>
        <div className="difficulty">
          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="difficultyMenu"
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="type-container">
          <h2 className="type-text">Type:</h2>
        </div>
        <div className="type">
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="typeMenu"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="quiz-button">
          <button
            className="find-quiz"
            onClick={() => {
              handleGenerateQuiz();
            }}
          >
            Generate Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
