import { useEffect, useState } from "react";
import Column from "../components/Column";
import Silk from "../components/Silk";
import Statistics from "../components/Statistics";

interface Task {
  text: string;
  status: "todo" | "in-progress" | "done";
}

interface HomeProps {
  userIP?: string;
}

const Home: React.FC<HomeProps> = ({ userIP }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(
      userIP ? `taskflow-data-${userIP}` : "taskflow-data"
    );
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (userIP) {
      localStorage.setItem(`taskflow-data-${userIP}`, JSON.stringify(tasks));
    } else {
      localStorage.setItem("taskflow-data", JSON.stringify(tasks));
    }
  }, [tasks, userIP]);

  const filteredTasks = {
    todo: tasks.filter(
      (task) =>
        task.status === "todo" &&
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    inProgress: tasks.filter(
      (task) =>
        task.status === "in-progress" &&
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    done: tasks.filter(
      (task) =>
        task.status === "done" &&
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, status: "todo" }]);
    setNewTask("");
  };

  const moveTask = (task: Task, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((t) => (t.text === task.text ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTask = (task: Task) => {
    setTasks(tasks.filter((t) => t.text !== task.text));
  };

  const onDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const moveToNextColumn = (task: Task) => {
    const statusOrder: Task["status"][] = ["todo", "in-progress", "done"];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];

    moveTask(task, newStatus);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `taskflow-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  const clearAllTasks = () => {
    if (confirm("¿Estás seguro de que quieres eliminar todas las tareas?")) {
      setTasks([]);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fondo Silk */}
      <div className="fixed inset-0 -z-10">
        <Silk
          speed={3}
          scale={0.8}
          color="#667eea"
          noiseIntensity={1.2}
          rotation={0.5}
        />
      </div>

      {/* Contenido - SIN bg-black/30 */}
      <div className="relative z-10 p-4 md:p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 md:mb-0">
              TaskFlow Kanban 🚀
            </h1>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={exportData}
                className="bg-green-500/20 backdrop-blur-md border border-green-400/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-green-500/30 transition-all text-sm md:text-base"
                title="Exportar tareas"
              >
                📤 Exportar
              </button>

              <button
                onClick={clearAllTasks}
                className="bg-red-500/20 backdrop-blur-md border border-red-400/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-red-500/30 transition-all text-sm md:text-base"
                title="Eliminar todas las tareas"
              >
                🗑️ Limpiar
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <Statistics tasks={tasks} />

          {/* Búsqueda */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-full max-w-2xl relative">
              {/* Icono con z-index más alto */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z" />
                  <path
                    strokeLinecap="round"
                    d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full bg-white/15 backdrop-blur-md border border-white/25 text-white p-3 pl-10 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-0"
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Input nueva tarea */}
          <div className="flex justify-center mb-6 md:mb-8 w-full max-w-2xl mx-auto">
            <div className="w-full max-w-2xl relative">
              {/* Icono con z-index más alto */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z" />
                  <path
                    strokeLinecap="round"
                    d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"
                  />
                </svg>
              </div>
              <input
              type="text"
              className="w-full flex-1 bg-white/15 backdrop-blur-md border border-white/70 text-white pl-10 p-3 rounded-l-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe una nueva tarea..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              autoFocus
            />
            </div>
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-4 md:px-6 rounded-r-lg hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              Agregar
            </button>
          </div>

          {/* Columnas Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
            <Column
              title="Pendientes 📝"
              tasks={filteredTasks.todo}
              onDrop={(task) => moveTask(task, "todo")}
              onDragStart={onDragStart}
              onDelete={deleteTask}
              onMove={moveToNextColumn}
            />
            <Column
              title="En Progreso ⚡"
              tasks={filteredTasks.inProgress}
              onDrop={(task) => moveTask(task, "in-progress")}
              onDragStart={onDragStart}
              onDelete={deleteTask}
              onMove={moveToNextColumn}
            />
            <Column
              title="Completadas ✅"
              tasks={filteredTasks.done}
              onDrop={(task) => moveTask(task, "done")}
              onDragStart={onDragStart}
              onDelete={deleteTask}
              onMove={moveToNextColumn}
            />
          </div>

          {userIP && (
            <div className="mt-6 md:mt-8 text-center text-white/60 text-sm">
              <p>Tus tareas están guardadas con tu ID: {userIP}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
