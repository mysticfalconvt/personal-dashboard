import { useQuery } from "@tanstack/react-query";

export default function DisplayTodoistShoppingList() {
  const fifteenMin = 1000 * 60 * 15;
  const { data } = useQuery(
    ["todoist"],
    () => fetch("api/todoistShoppingList").then((res) => res.json()),
    {
      refetchInterval: fifteenMin,
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
    <div className="flex flex-col items-center justify-center gap-11 ">
      <div className="text-2xl ">
        <div className="text-3xl font-bold">Alexa Shopping List</div>
        {shoppingList?.map((item: any) => {
          const date = new Date(item.createdAt);
          return (
            <div key={item.id}>
              {item.content} -{" "}
              <span className="text-lg">{date.toLocaleDateString()}</span>
            </div>
          );
        })}
      </div>
      <div className="text-xl ">
        <div className="text-3xl font-bold">Other Tasks</div>
        {otherTasks?.map((item: any) => {
          const date = new Date(item.createdAt);
          return (
            <div key={item.id}>
              {item.content} -{" "}
              <span className="text-lg">
                {date.toLocaleDateString()} - {item.project}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
