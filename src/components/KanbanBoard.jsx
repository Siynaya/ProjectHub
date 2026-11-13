import { Plus, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { calculateProgress } from '../utils/helpers';

const KanbanBoard = ({ tasks, onAddTask, onEditTask, onDeleteTask, onStatusChange, projectTitle }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  const columns = [
    { id: 'todo', title: 'To Do', icon: Clock, color: 'border-gray-500/30' },
    { id: 'in-progress', title: 'In Progress', icon: Clock, color: 'border-blue-500/30' },
    { id: 'completed', title: 'Completed', icon: CheckCircle2, color: 'border-emerald-500/30' }
  ];

  const addTask = (task) => {
    onAddTask({ ...task, status: 'todo' });
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(taskId);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    onStatusChange(taskId, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{projectTitle || 'Tasks'}</h2>
          <p className="text-slate-400 text-sm">
            {tasks.length} total tasks {calculateProgress(tasks.length, tasks.filter(t => t.status === 'completed').length)}% complete
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-purple-900/30"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className={`flex flex-col gap-4 ${filter !== 'all' && filter !== column.id ? 'opacity-50' : ''}`}>
            <div className={`flex items-center gap-2 pb-2 border-b ${column.color}`}>
              <column.icon size={20} className={column.id === 'completed' ? 'text-emerald-500' : column.id === 'in-progress' ? 'text-blue-500' : 'text-gray-500'} />
              <h3 className="font-semibold text-white">{column.title}</h3>
              <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
                {filteredTasks.filter(t => t.status === column.id).length}
              </span>
            </div>

            <div className="flex-1 space-y-3 min-h-[200px]">
              {filteredTasks
                .filter(t => t.status === column.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onEdit={editTask}
                    onDelete={handleDelete}
                  />
                ))}

              {filteredTasks.filter(t => t.status === column.id).length === 0 && (
                <div className="border-2 border-dashed border-slate-700/50 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-slate-800 rounded-full mb-3">
                    {column.id === 'completed' ? <CheckCircle2 size={24} className="text-emerald-500/50" /> : <Clock size={24} className="text-gray-500/50" />}
                  </div>
                  <p className="text-slate-500 text-sm">No tasks in this column</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={addTask}
        taskToEdit={editingTask}
      />
    </div>
  );
};

export default KanbanBoard;
