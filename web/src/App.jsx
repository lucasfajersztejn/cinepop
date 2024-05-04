import "./App.css";
import Hello from "./components/hello";
import Footer from "./components/ui/footer/footer";
import Navbar from "./components/ui/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hello />

      <Footer />
    </>
  );
}

export default App;
