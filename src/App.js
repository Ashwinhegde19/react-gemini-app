import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("")
  const [chatHistory, setChatHistory] = useState([]);
  const surpriseOption = [
    'who is the PM of India?',
    'what is the capital of India?',
    'which planet has atmosphere similar to earth?'
  ]

  const surprise = () => {
    const index = Math.floor(Math.random() * surpriseOption.length);
    setValue(surpriseOption[index]);
  }

  const getResponse = async () => {
    if (!value) {
      setError("Please ask a question!!")
      return
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: { "Content-Type": "application/json" },
      }
        const response = await fetch("http://localhost:3001/gemini", options)
        const data = await response.text();
        console.log(data);  
      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: value
      },
      {
        role: "model",
        parts: data
      }
      ])  
      setValue("")

    } catch (error) {
      console.log(error);
      setError("Oops! Something went wrong.");

    }
  }

  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }

  return (
    <div className="app">
      <p>what do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me </button>
      </p>

      <div className="input-container">
        <input
          value={value}
          placeholder="when is Ugadi?"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me </button>}
        {error && <button onClick={clear}>Clear </button>}
      </div>
      {error && <p>{error}</p>}
      <div className="result">
        {chatHistory.map((chatItem, _index) => <div key={_index}>
          <p className="answer">{chatItem.role} : {chatItem.parts}</p>
        </div>)}

      </div>
    </div>
  );
}

export default App;
