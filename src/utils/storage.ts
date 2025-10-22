export const saveTask = (task: string) => {
  const cookiesAccepted = localStorage.getItem("cookies-accepted");
  if (cookiesAccepted === "true") {
    const tasks: string[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    console.warn("No se guardó la tarea porque no se aceptaron las cookies");
  }
};

export const getTasks = (): string[] => {
  const cookiesAccepted = localStorage.getItem("cookies-accepted");
  if (cookiesAccepted === "true") {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }
  return [];
};

export const clearTasks = (): void => {
  localStorage.removeItem("tasks");
};
