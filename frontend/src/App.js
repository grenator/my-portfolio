import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Resume from "./pages/Resume";

function Layout({ children }) {
  return (
    <div className="App">
      <div className="max-w-3xl mx-auto px-5 pt-10 pb-16">
        <Navbar />
        <main className="mt-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/resume" element={<Layout><Resume /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
