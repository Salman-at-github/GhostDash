import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import {GlobalStateProvider} from "./context/GlobalContext";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Posts from "./components/Posts";
import Links from "./components/Links";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <GlobalStateProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />}>
            </Route>
            <Route exact path="/posts" element={<Posts/>}>
            </Route>
            <Route exact path="/links" element={<Links/>}>
            </Route>
          </Routes>
          <Footer/>
        </Router>
      </GlobalStateProvider>
    </>
  );
}

export default App;
