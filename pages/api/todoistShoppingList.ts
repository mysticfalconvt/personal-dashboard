import { NextApiRequest, NextApiResponse } from "next";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { Task } from "@doist/todoist-api-typescript/dist/types/entities";

export type taskList = Task[];
export interface ProjectList {
  [key: string]: taskList;
}

export default async function getShoppingList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = new TodoistApi(process.env.TODOIST_API_KEY as string);
  const projects = await api.getProjects();

  const allTasks = await api.getTasks();
  const allProjectsWithTasks = projects.reduce(
    (projectsToSend: ProjectList, project) => {
      const tasks = allTasks.filter((task) => task.projectId === project.id);
      projectsToSend[project.name] = tasks;
      return projectsToSend;
    },
    {}
  );

  res.status(200).json(allProjectsWithTasks);
}
