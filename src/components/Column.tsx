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
  onMove: (task: Task) => void;
}

function Column({ title, tasks, onDrop, onDragStart, onDelete, onMove }: ColumnProps) {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 min-h-[400px] shadow-xl"
      onDragOver={onDragOver}
      onDrop={(e) => {
        const data = e.dataTransfer.getData("task");
        if (data) onDrop(JSON.parse(data));
      }}
    >
      <h2 className="text-white text-lg md:text-xl font-bold mb-4 text-center">
        {title} <span className="text-white/60">({tasks.length})</span>
      </h2>
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <TaskCard
            key={idx}
            task={task}
            onDragStart={onDragStart}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-white/40 text-center py-8">
            No hay tareas
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;