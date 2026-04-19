import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDirectoryPage from "./pages/StudentDirectoryPage";
import StudentProfilePage from "./pages/StudentProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDirectoryPage />} />
        <Route path="/students/:id" element={<StudentProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}