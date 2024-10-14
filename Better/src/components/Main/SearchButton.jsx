import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import "./main.css";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to control visibility

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSent();
    }
  };

  const handleSent = () => {
    if (input) {
      onSent();
      const newEntry = { prompt: input, result: resultData };
      setHistory((prevHistory) => [...prevHistory, newEntry]);
      setInput(""); // Reset the input field
    }
  };

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How Can I Help you today?</p>
            </div>
            {/* Your existing cards code */}
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Button to toggle search history */}
        <button className="toggle-history-btn" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide Search History" : "Show Search History"}
        </button>

        {/* Conditionally render history based on showHistory state */}
        {showHistory && (
          <div className="history">
            <h3>Search History</h3>
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <p><strong>Prompt:</strong> {item.prompt}</p>
                <p><strong>Result:</strong> {item.result}</p>
              </div>
            ))}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={handleSent} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <div className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and Gemini Apps
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
