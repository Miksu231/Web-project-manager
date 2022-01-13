import { executeQuery } from "../database/database.js";
import { deleteAllIssues} from "./projectIssueService.js";
const findAllProjects = async () => {
    const result = await executeQuery("SELECT * FROM projects;");
    return result.rows;
};

const addProject = async (name) => {
    await executeQuery("INSERT INTO projects (name) VALUES($1);", name);
};
const removeProjectByID = async (id) => {
    await deleteAllIssues(id);
    await executeQuery("DELETE FROM projects WHERE id=$1;", id);
};

const getProjectByID = async (id) => {
    const result = await executeQuery("SELECT * FROM projects WHERE id=$1;", id);
    if(result.rows && result.rows.length > 0) {
    return result.rows[0];
    }
    return { id: 0, name: "Unknown" };
};

export { findAllProjects, addProject, removeProjectByID, getProjectByID};