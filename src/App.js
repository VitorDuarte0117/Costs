import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Container customClass="min-height">
                    <Routes>
                        <Route exact path="projects" element={<Projects />} />
                        <Route
                            exact
                            path="/project/:id"
                            element={<Project />}
                        />
                        <Route path="company" element={<Company />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="newproject" element={<NewProject />} />
                        <Route exact path="/" element={<Home />} />
                    </Routes>
                </Container>

                <Footer />
            </Router>
        </>
    );
}

export default App;
