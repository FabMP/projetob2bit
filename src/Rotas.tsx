import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRotas = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </Router>
    )
}

export default AppRotas;