import { motion } from 'framer-motion';

interface Task {
  text: string;
  status: "todo" | "in-progress" | "done";
}

interface StatisticsProps {
  tasks: Task[];
}

export default function Statistics({ tasks }: StatisticsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = tasks.filter(t => t.status === 'todo').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total", value: total, color: "bg-white/10", border: "border-white/20" },
    { label: "Pendientes", value: pending, color: "bg-blue-500/20", border: "border-blue-400/30" },
    { label: "En Progreso", value: inProgress, color: "bg-yellow-500/20", border: "border-yellow-400/30" },
    { label: "Completadas", value: completed, color: "bg-green-500/20", border: "border-green-400/30" },
    { label: "Completado", value: `${completionRate}%`, color: "bg-purple-500/20", border: "border-purple-400/30" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          className={`${stat.color} backdrop-blur-md rounded-xl p-3 md:p-4 text-center border ${stat.border}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}