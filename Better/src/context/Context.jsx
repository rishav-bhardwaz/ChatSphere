import { createContext, useState } from "react"
import run from "../config/gemini"

export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [previousPrompt, setpreviousPrompt] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 45 * index);
  };

  const newChat = () => {
    setLoading(false);
    setshowResult(false);
  };

  const onSent = async (prompt) => {
    setresultData("");
    setLoading(true);
    setshowResult(true);
    let response;
    if (prompt != undefined) {
      response = await run(prompt);
      setrecentPrompt(prompt);
    } else {
      setpreviousPrompt((prev) => [...prev, input]);
      setrecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 != 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    // setresultData(newResponse2);
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };
 
  const contextValue = {
    previousPrompt,
    setpreviousPrompt,
    onSent,
    setrecentPrompt,

    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    // newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;