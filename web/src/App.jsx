import { useState } from "react";
import "./App.css";
import Hello from "./components/hello";
import Footer from "./components/ui/footer/footer";
import Navbar from "./components/ui/navbar/navbar";

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
      <Hello />

      <Footer />
    </main>
  );
}

export default App;
