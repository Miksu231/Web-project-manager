import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as utilities from "./utils/utilities.js";
import * as projectController from "./controllers/projectController.js";
import * as issueController from "./controllers/issueController.js";
configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "GET") {
        return utilities.redirectTo("/projects");
  } else if(url.pathname === "/projects" && request.method === "GET") {
        return await projectController.viewProjects();
  } else if(url.pathname === "/projects" && request.method === "POST") {
        return await projectController.addProject(request);
  } else if (url.pathname.match("projects/[0-9]+/issues/[0-9]+") && request.method === "POST") {
    return await issueController.resolveIssue(request);
  } else if (url.pathname.match("projects/[0-9]+/issues") && request.method === "POST") {
        return issueController.addNewIssue(request);
  } else if (url.pathname.match("projects/[0-9]+") && request.method === "GET") {
        return issueController.getIssues(request);
  } else if (url.pathname.match("projects/[0-9]+") && request.method === "POST") {
        return await projectController.removeProject(request); 
  } else return utilities.redirectTo("/projects");
};

listenAndServe(":7777", handleRequest);