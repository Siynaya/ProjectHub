import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import {
  LayoutDashboard,
  FolderOpen,
  ListTodo,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  Plus
} from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useLocalStorage('projects', []);
  const [tasks] = useLocalStorage('tasks', []);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    setShowProjectModal(false);
  };

  // Calculate stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active' || !p.status).length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const activeTasks = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress').length;

  // Filter projects by search term
  const filteredProjects = projects.filter(p =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by most recent
  const recentProjects = filteredProjects
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <button
          onClick={() => setShowProjectModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-purple-900/30 font-medium"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          change={totalProjects > 0 ? 12 : 0}
          changeType="positive"
          icon={FolderOpen}
          color="purple"
        />
        <StatCard
          title="Active Projects"
          value={activeProjects}
          change={activeProjects > 0 ? 8 : 0}
          changeType="positive"
          icon={LayoutDashboard}
          color="blue"
        />
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          change={completedTasks > 0 ? 15 : 0}
          changeType="positive"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Active Tasks"
          value={activeTasks}
          change={activeTasks > 0 ? 5 : 0}
          changeType="neutral"
          icon={ListTodo}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Projects</h2>
            <button
              onClick={() => navigate('/projects')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All
            </button>
          </div>

          {recentProjects.length === 0 ? (
            <div className="border-2 border-dashed border-slate-700/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-slate-800 rounded-full mb-4">
                <FolderOpen size={40} className="text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
              <p className="text-slate-400 max-w-md mb-4">
                Create your first project to start managing your tasks and tracking progress.
              </p>
              <button
                onClick={() => setShowProjectModal(true)}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium"
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>

          {recentTasks.length === 0 && projects.length === 0 ? (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <p className="text-slate-400">No recent activity</p>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="space-y-4">
                {tasks.slice(0, 6).map(task => (
                  <div key={task.id} className="flex items-start gap-3 pb-3 border-b border-slate-700/50 last:border-0 last:pb-0">
                    <div className={`mt-1 w-2 h-2 rounded-full ${
                      task.status === 'completed' ? 'bg-emerald-500' :
                      task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="text-sm text-white font-medium">{task.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Task updated • {new Date(task.updatedAt || task.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {projects.slice(0, 4).map(project => (
                  <div key={`project-${project.id}`} className="flex items-start gap-3 pb-3 border-b border-slate-700/50 last:border-0 last:pb-0">
                    <div className="mt-1 w-2 h-2 rounded-full bg-purple-500" />
                    <div>
                      <p className="text-sm text-white font-medium">{project.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Project updated • {new Date(project.updatedAt || project.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Quick Actions</h3>
            <button
              onClick={() => navigate('/projects')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors text-sm text-white"
            >
              <FolderOpen size={18} className="text-purple-400" />
              View All Projects
            </button>
            <button
              onClick={() => navigate('/tasks')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors text-sm text-white"
            >
              <ListTodo size={18} className="text-blue-400" />
              View All Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default Dashboard;
