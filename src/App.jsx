import React from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  // selected file (PDF)
  const [file, setFile] = useState(null);

  // chosen task (summarize / quiz)
  const [task, setTask] = useState("");

  // AI output text
  const [output, setOutput] = useState("");

  // loading state for button
  const [loading, setLoading] = useState(null);

  // checks if user can press "Generate"
  const canGenerate = file !== null && task !== "";

  // when user selects a file
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
  };

  // fake AI generation (temporary)
  // const handleGenerate = () => {
  //   if (!canGenerate) return;

  //   setLoading(true);

  //   // simulate AI delay
  //   setTimeout(() => {
  //     if (task === "summarize") {
  //       setOutput("This is a summary of your PDF (Fake Ai Result).");
  //     }

  //     if (task === "quiz") {
  //       setOutput("Q1: What is this PDF about ? \n A: ...");
  //     }

  //     setLoading(false);
  //   }, 1500);
  // };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("pdf", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
      );

      setOutput(response.data.text);
      
    } catch (error) {
      console.log(error);

      setOutput("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900">
      {/* page title */}
      <h1 className="text-4xl font-bold mb-8 text-white">AI Study Helper</h1>

      {/* main card */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl w-full max-w-md">
        {/* file upload */}
        <label className="bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300">
          Upload PDF
          {/* show selected file */}
          {file && (
            <p className="text-sm text-gray-600">Selected: {file.name}</p>
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* task selection */}
        <select
          name="taskSelect"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Select a task</option>
          <option value="summarize">Summarize</option>
          <option value="quiz">Generate Quiz</option>
        </select>

        {/* generate button */}
        <button
          disabled={!canGenerate || loading}
          onClick={handleUpload}
          className="bg-gray-600 text-white p-2 rounded-lg disabled:bg-gray-300"
        >
          {loading ? "Uploading..." : "Generate"}
        </button>
      </div>

      {/* output section */}
      {output && (
        <div className="mt-4 border-t pt-4 text-white">
          <h3 className="font-bold mb-2">Result:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
