import { executeQuery } from "../database/database.js";

const listAllIssues = async (project_id) => {
    const result = await executeQuery("SELECT * FROM project_issues WHERE project_id = $1;", project_id);
    return result.rows;
};
const addIssue = async (project_id, description) => {
    await executeQuery("INSERT INTO project_issues (project_id, description) VALUES($1, $2);", project_id, description);
};

const deleteIssue = async (project_id, issue_id) => {
    await executeQuery("DELETE FROM project_issues WHERE project_id = $1 AND id = $2;", project_id, issue_id);
};
const deleteAllIssues = async(project_id) => {
    await executeQuery("DELETE FROM project_issues WHERE project_id = $1;", project_id);
}
export { listAllIssues, addIssue, deleteIssue, deleteAllIssues}