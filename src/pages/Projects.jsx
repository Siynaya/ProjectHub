import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Trash2,
  Edit2
} from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useLocalStorage('projects', []);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Load tasks for progress calculation
  const [tasks] = useLocalStorage('tasks', []);

  useEffect(() => {
    // Load tasks if not already loaded
    if (tasks.length === 0) {
      const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      if (existingTasks.length > 0) {
        // Tasks already exist, just proceed
      }
    }
  }, [tasks.length]);

  const handleSaveProject = (project) => {
    setProjects(prev => {
      const existingIndex = prev.findIndex(p => p.id === project.id);
      if (existingIndex >= 0) {
        const updatedProjects = [...prev];
        updatedProjects[existingIndex] = {
          ...project,
          updatedAt: new Date().toISOString()
        };
        return updatedProjects;
      }
      // New project - add with proper defaults
      return [{
        ...project,
        id: project.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: []
      }, ...prev];
    });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      // Also delete associated tasks
      const projectTasks = tasks.filter(t => t.projectId === projectId).map(t => t.id);
      if (projectTasks.length > 0) {
        const newTasks = tasks.filter(t => !projectTasks.includes(t.id));
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      }
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline || 0) - new Date(b.deadline || 0);
        case 'progress':
          const aProgress = a.tasks ? a.tasks.filter(t => t.status === 'completed').length : 0;
          const bProgress = b.tasks ? b.tasks.filter(t => t.status === 'completed').length : 0;
          return bProgress - aProgress;
        case 'recent':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active' || !p.status).length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="text-slate-400">Manage and track your ongoing projects</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowProjectModal(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-purple-900/30 font-medium"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Total Projects</div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Active</div>
          <div className="text-2xl font-bold text-blue-400">{stats.active}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Completed</div>
          <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
          >
            <option value="recent">Sort by Recent</option>
            <option value="deadline">Sort by Deadline</option>
            <option value="progress">Sort by Progress</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="border-2 border-dashed border-slate-700/50 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <div className="p-6 bg-slate-800 rounded-full mb-6">
            <Search size={48} className="text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
          <p className="text-slate-400 max-w-md">
            Try adjusting your search or filters, or create a new project to get started.
          </p>
          <button
            onClick={() => {
              setEditingProject(null);
              setShowProjectModal(true);
            }}
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors font-medium"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSave={handleSaveProject}
        projectToEdit={editingProject}
      />
    </div>
  );
};

export default Projects;
