import { NextApiRequest, NextApiResponse } from "next";
import { TodoistApi } from "@doist/todoist-api-typescript";

export default async function getShoppingList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = new TodoistApi(process.env.TODOIST_API_KEY as string);
  const projects = await api.getProjects();
  const shoppingList = projects.find((project) =>
    project.name.includes("hopping")
  );
  const shoppingListItems = await api.getTasks({ projectId: shoppingList?.id });
  res.status(200).json(shoppingListItems);
}
