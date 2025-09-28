import { useEffect, useState } from "react";
import Column from "../components/Column";

interface Task {
  text: string;
  status: "todo" | "in-progress" | "done";
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("taskflow-data");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("taskflow-data", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, status: "todo" }]);
    setNewTask("");
  };

  const moveTask = (task: Task, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((t) =>
        t.text === task.text ? { ...t, status: newStatus } : t
      )
    );
  };

  const deleteTask = (task: Task) => {
    setTasks(tasks.filter((t) => t.text !== task.text));
  };

  const onDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-800">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          TaskFlow Kanban 🚀
        </h1>

        {/* Input */}
        <div className="flex justify-center mb-6 w-full max-w-2xl mx-auto">
          <input
            type="text"
            className="border p-2 rounded-l-lg flex-grow"
            placeholder="Escribe una nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
          >
            Agregar
          </button>
        </div>

        {/* Columnas Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Column
            title="Pendientes 📝"
            tasks={tasks.filter((t) => t.status === "todo")}
            onDrop={(task) => moveTask(task, "todo")}
            onDragStart={onDragStart}
            onDelete={deleteTask}
          />
          <Column
            title="En Progreso ⚡"
            tasks={tasks.filter((t) => t.status === "in-progress")}
            onDrop={(task) => moveTask(task, "in-progress")}
            onDragStart={onDragStart}
            onDelete={deleteTask}
          />
          <Column
            title="Completadas ✅"
            tasks={tasks.filter((t) => t.status === "done")}
            onDrop={(task) => moveTask(task, "done")}
            onDragStart={onDragStart}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;