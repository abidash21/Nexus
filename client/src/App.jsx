import EditorPage from "./components/EditorPage";
import HomePage from "./components/HomePage";
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/editor/:roomId" element={<EditorPage />}/>
      </Routes>
    </>
  )
}
