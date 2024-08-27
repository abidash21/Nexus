import EditorPage from "./components/EditorPage";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <div>
        <Toaster position="top-center"></Toaster>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  );
}
