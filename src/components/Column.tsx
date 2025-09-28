import TaskCard from "./TaskCard";

interface Task {
  text: string;
  status: "todo" | "in-progress" | "done";
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (task: Task) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDelete: (task: Task) => void;
}

function Column({ title, tasks, onDrop, onDragStart, onDelete }: ColumnProps) {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-neutral-900 rounded-2xl shadow-lg p-4 min-h-[300px]"
      onDragOver={onDragOver}
      onDrop={(e) => {
        const data = e.dataTransfer.getData("task");
        if (data) onDrop(JSON.parse(data));
      }}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks.map((task, idx) => (
        <TaskCard
          key={idx}
          task={task}
          onDragStart={onDragStart}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Column;
