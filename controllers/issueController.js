import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as utilities from "../utils/utilities.js";
import * as projectIssueService from "../services/projectIssueService.js"
import * as projectService from "../services/projectService.js"

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const getIssues = async (request) => {
    const id = new URL(request.url).pathname.split("/")[2];
 const data = {
    project: await projectService.getProjectByID(id), 
    project_id: id,
    issues: await projectIssueService.listAllIssues(id), 
 };
 return new Response(await renderFile("projectIssues.eta", data), responseDetails);
};

const addNewIssue = async (request) => {
   const id = new URL(request.url).pathname.split("/")[2];
   const formData = await request.formData();
   const description = formData.get("description");

   await projectIssueService.addIssue(id, description);

   return utilities.redirectTo(`/projects/${id}`);
};

const resolveIssue = async (request) => {
    const project_id= new URL(request.url).pathname.split("/")[2];
    const issue_id = new URL(request.url).pathname.split("/")[4];

    await projectIssueService.deleteIssue(project_id, issue_id);

    return utilities.redirectTo(`/projects/${project_id}`);
};

export {getIssues, addNewIssue, resolveIssue}
