import { motion } from "framer-motion";

interface Task {
  text: string;
  status: "todo" | "in-progress" | "done";
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDelete: (task: Task) => void;
}

function TaskCard({ task, onDragStart, onDelete }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(e, task);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
    >
      <motion.div
        className="bg-white shadow-md rounded-lg p-3 cursor-grab flex justify-between items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p
          className={`text-black text-center flex-grow ${
            task.status === "done" ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </p>
        <button
          onClick={() => onDelete(task)}
          className="ml-2 text-red-500 hover:text-red-700 font-bold"
        >
          ❌
        </button>
      </motion.div>
    </div>
  );
}

export default TaskCard;