import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import Message from "../layout/Message";

import styles from "./Projects.module.css";

import Container from "../layout/Container";

import LinkButton from "../layout/LinkButton";

import ProjectCard from "../project/ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("");

    const location = useLocation();
    let message = "";
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data);
            })
            .catch((err) => console.log(err));
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) =>
            resp
                .json()
                .then(() => {
                    setProjects(
                        projects.filter((project) => project.id !== id)
                    );
                    setProjectMessage("Project removed successfully!");
                })
                .catch((err) => console.log(err))
        );
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My projects</h1>
                <LinkButton to="/newproject" text="Create new project" />
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
            </Container>
        </div>
    );
}
export default Projects;
