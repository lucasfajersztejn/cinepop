import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/ui/footer/footer";
import Navbar from "./components/ui/navbar/navbar";
import Home from "./pages/home";
import Movies from "./pages/movies";
import MovieDetail from "./pages/movieDetail";
import Cinemas from "./pages/cinemas";
import CinemaDetail from "./pages/cinemaDetail";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <main className={ darkMode ? 'dark' : '' }>
      <header className="backdrop-blur-md bg-dark-200/30 fixed w-full z-20 top-0 left-0">
        <Navbar onDarkMode={handleDarkMode} darkMode={darkMode} />
      </header>

      <Routes> 
        <Route path="/" element={<Home />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/movies/:id" element={<MovieDetail />}/>
        <Route path="/cinemas" element={<Cinemas />}/>
        <Route path="/cinemas/:id" element={<CinemaDetail />}/>
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
