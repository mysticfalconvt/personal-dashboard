import { useQuery } from "@tanstack/react-query";
import { ProjectList, taskList } from "../pages/api/todoistShoppingList";

export default function DisplayTodoistShoppingList() {
  const twoMinutes = 1000 * 60 * 2;
  const { data } = useQuery(
    ["todoist"],
    () => fetch("api/todoistShoppingList").then((res) => res.json()),
    {
      refetchInterval: twoMinutes,
    }
  );

  if (!data) return <div>Loading...</div>;
  const shoppingListName = Object.keys(data).filter((key) =>
    key.includes("Shopping")
  )[0];
  const shoppingList = data[shoppingListName];
  const otherProjects = Object.keys(data).filter(
    (key) => !key.includes("Shopping")
  );
  const otherTasks: any = [];

  otherProjects.forEach((project) => {
    otherTasks.push(...data[project]);
  });

  // add project name to each task
  otherTasks.forEach((task: any) => {
    task.project = Object.keys(data).filter((key) =>
      data[key].includes(task)
    )[0];
  });
  // console.log(otherTasks);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold">Todoist Shopping List</div>
      <div className="text-2xl font-bold">
        {shoppingList?.map((item: any) => {
          const date = new Date(item.createdAt);
          return (
            <div key={item.id}>
              {item.content} - {date.toLocaleDateString()}
            </div>
          );
        })}
        {otherTasks?.map((item: any) => {
          const date = new Date(item.createdAt);
          return (
            <div key={item.id}>
              {item.content} - {date.toLocaleDateString()} - {item.project}
            </div>
          );
        })}
      </div>
    </div>
  );
}
