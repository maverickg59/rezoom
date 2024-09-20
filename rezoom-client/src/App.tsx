// import { useState } from "react";
import { SingleFileUploader } from "./components/Uploader";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold">Rezoom</h1>
      <SingleFileUploader />
    </>
  );
}

export default App;
