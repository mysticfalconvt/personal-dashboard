import { useQuery } from "@tanstack/react-query";

export default function DisplayTodoistShoppingList() {
  const { data } = useQuery(
    ["todoist", "shopping"],
    () => fetch("api/todoistShoppingList").then((res) => res.json()),
    {
      refetchInterval: 60000,
    }
  );

  if (!data) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold">Todoist Shopping List</div>
      <div className="text-2xl font-bold">
        {data?.map((item: any) => {
          const date = new Date(item.createdAt);
          return (
            <div key={item.id}>
              {item.content} - {date.toLocaleDateString()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
