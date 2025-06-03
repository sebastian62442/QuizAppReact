// src/App.tsx
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="App">
      <img
        src="/vite.svg"
        alt="Logo"
        style={{ width: "100px", margin: "20px auto" }}
      />
      <Quiz />
    </div>
  );
}

export default App;
