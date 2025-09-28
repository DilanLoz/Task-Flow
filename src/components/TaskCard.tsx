import { motion } from "framer-motion";
import { DeleteIcon } from "./DeleteIcon";
import { MoveIcon } from "./MoveIcon";

interface Task {
  text: string;
  status: "todo" | "in-progress" | "done";
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDelete: (task: Task) => void;
  onMove: (task: Task) => void;
}

function TaskCard({ task, onDragStart, onDelete, onMove }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(e, task);
  };

  const handleMove = () => {
    onMove(task);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      <motion.div
        className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-xl p-4 cursor-grab flex justify-between items-center shadow-2xl group hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p
          className={`text-white font-medium flex-grow ${
            task.status === "done" ? "line-through text-white/60" : ""
          }`}
        >
          {task.text}
        </p>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Botón para mover a siguiente columna */}
          <button
            onClick={handleMove}
            className="text-white/70 hover:text-green-400 hover:scale-110 transition-all duration-200 p-1"
            title="Mover a siguiente columna"
          >
            <MoveIcon />
          </button>
          
          {/* Botón para eliminar */}
          <button
            onClick={handleDelete}
            className="text-white/70 hover:text-red-400 hover:scale-110 transition-all duration-200 p-1"
            title="Eliminar tarea"
          >
            <DeleteIcon />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TaskCard;  