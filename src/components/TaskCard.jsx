import { Edit2, Trash2, CheckCircle2, Clock, XCircle, MoreVertical, MessageSquare } from 'lucide-react';

const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
  const statusConfig = {
    'todo': {
      icon: Clock,
      label: 'To Do',
      color: 'bg-gray-500',
      text: 'text-gray-400',
      border: 'border-gray-600/30'
    },
    'in-progress': {
      icon: Clock,
      label: 'In Progress',
      color: 'bg-blue-500',
      text: 'text-blue-400',
      border: 'border-blue-600/30'
    },
    'completed': {
      icon: CheckCircle2,
      label: 'Completed',
      color: 'bg-emerald-500',
      text: 'text-emerald-400',
      border: 'border-emerald-600/30'
    }
  };

  const currentStatus = statusConfig[task.status] || statusConfig['todo'];
  const StatusIcon = currentStatus.icon;

  const priorityColors = {
    'high': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-green-500'
  };
  const priorityColor = priorityColors[task.priority?.toLowerCase()] || priorityColors['medium'];

  return (
    <div className={`bg-slate-800 border ${task.status === 'completed' ? 'border-emerald-600/30' : 'border-slate-700'} rounded-xl p-4 hover:border-slate-600 transition-all duration-300 group`}>
      <div className="flex items-start gap-3">
        <div className={`mt-1 p-1.5 rounded-lg ${task.status === 'completed' ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
          <StatusIcon size={16} className={task.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white mb-1 truncate">
            {task.title}
          </h4>
          <p className="text-sm text-slate-400 line-clamp-2 mb-3">
            {task.description || 'No description'}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded-md font-medium ${task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
              {currentStatus.label}
            </span>

            <span className={`text-xs px-2 py-1 rounded-md font-medium ${priorityColor} bg-opacity-10 text-white`}>
              {task.priority || 'Medium'}
            </span>

            <span className="text-xs text-slate-500 flex items-center gap-1">
              Due: {task.dueDate || 'No date'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="bg-slate-700 text-xs text-white rounded-lg px-2 py-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex items-start gap-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
