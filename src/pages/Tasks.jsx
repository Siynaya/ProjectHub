import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import {
  Plus,
  Search,
  Filter,
  Clock,
  Calendar,
  CheckCircle2,
  LayoutList
} from 'lucide-react';
import KanbanBoard from '../components/KanbanBoard';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [projects] = useLocalStorage('projects', []);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('due-date');

  const handleSaveTask = (task) => {
    setTasks(prev => {
      const existingIndex = prev.findIndex(t => t.id === task.id);
      if (existingIndex >= 0) {
        const updatedTasks = [...prev];
        updatedTasks[existingIndex] = {
          ...task,
          updatedAt: new Date().toISOString()
        };
        return updatedTasks;
      }
      return [{
        ...task,
        id: task.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, ...prev];
    });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return t;
    }));
  };

  const handleAddTask = (task) => {
    setTasks(prev => [{
      ...task,
      id: task.id || Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, ...prev]);
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority?.toLowerCase()] - priorityOrder[a.priority?.toLowerCase()];
        case 'due-date':
          return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        case 'created':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">All Tasks</h1>
          <p className="text-slate-400">Manage and track all your tasks across projects</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowTaskModal(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-purple-900/30 font-medium"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Total</div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">To Do</div>
          <div className="text-2xl font-bold text-gray-400">{stats.todo}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">In Progress</div>
          <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Completed</div>
          <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-slate-400 text-sm mb-1">Completion</div>
            <div className="text-2xl font-bold text-purple-400">
              {stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-3">
        <div className="bg-slate-800 p-1 rounded-xl flex items-center">
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <LayoutList size={16} />
            Kanban Board
          </button>
        </div>
        <p className="text-sm text-slate-500 ml-auto">
          {filteredTasks.length} task(s) found
        </p>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        tasks={filteredTasks}
        onAddTask={handleAddTask}
        onEditTask={(task) => {
          setEditingTask(task);
          setShowTaskModal(true);
        }}
        onDeleteTask={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </div>
  );
};

export default Tasks;
