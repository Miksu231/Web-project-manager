import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as utilities from "../utils/utilities.js";
import * as projectService from "../services/projectService.js"

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addProject = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await projectService.addProject(name);
  
    return utilities.redirectTo("/projects");
};

const viewProjects = async (request) => {
    const data = {
      projects: await projectService.findAllProjects(),
    };
    return new Response(await renderFile("projects.eta", data), responseDetails);
};

const removeProject = async (request) => {
    const id = new URL(request.url).pathname.split("/")[2];
    await projectService.removeProjectByID(id);

    return utilities.redirectTo("/projects");
};
const getProjectName = async (request) => {
    const result = await projectService.getProjectByID(id);
    return result.rows[0];
}
export {addProject, viewProjects, removeProject, getProjectName};