import { useState, useEffect } from "react";
import { saveTask, getTasks } from "../utils/storage";

export default function TaskManager() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTask(newTask);
    setNewTask("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mis tareas</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Escribe una tarea..."
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((t, i) => (
          <li key={i} className="bg-gray-100 px-3 py-2 rounded-lg">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
