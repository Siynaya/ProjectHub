import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  CheckCircle2,
  Clock,
  Calendar
} from 'lucide-react';

const Analytics = () => {
  const [projects] = useLocalStorage('projects', []);
  const [tasks] = useLocalStorage('tasks', []);

  const [timeRange, setTimeRange] = useState('all');

  // Calculate metrics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const activeProjects = projects.filter(p => p.status === 'active' || !p.status).length;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const activeTasks = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress').length;

  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Category breakdown
  const categoryCounts = projects.reduce((acc, project) => {
    const category = project.category || 'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryProgress = projects.reduce((acc, project) => {
    const category = project.category || 'Other';
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    acc[category].total += 1;
    acc[category].completed += project.status === 'completed' ? 1 : 0;
    return acc;
  }, {});

  // Priority breakdown
  const priorityCounts = tasks.reduce((acc, task) => {
    const priority = task.priority || 'Medium';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  // Recent activity
  const recentActivity = [...projects, ...tasks]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-slate-400">Track your productivity and project progress</p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm">Overall Completion</div>
              <div className="text-3xl font-bold text-white">{overallProgress}%</div>
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <BarChart3 className="text-blue-400" size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm">Projects</div>
              <div className="text-3xl font-bold text-white">{totalProjects}</div>
            </div>
          </div>
          <div className="text-sm text-slate-400 mt-2">
            {activeProjects} active • {completedProjects} completed
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <CheckCircle2 className="text-emerald-400" size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm">Tasks Completed</div>
              <div className="text-3xl font-bold text-white">{completedTasks}</div>
            </div>
          </div>
          <div className="text-sm text-slate-400 mt-2">
            {totalTasks} total tasks
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Clock className="text-orange-400" size={24} />
            </div>
            <div>
              <div className="text-slate-400 text-sm">Active Tasks</div>
              <div className="text-3xl font-bold text-white">{activeTasks}</div>
            </div>
          </div>
          <div className="text-sm text-slate-400 mt-2">
            {tasks.filter(t => t.dueDate).length} with deadlines
          </div>
        </div>
      </div>

      {/* Category & Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Projects by Category</h3>
          {Object.entries(categoryCounts).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(categoryCounts).map(([category, count]) => {
                const progress = categoryProgress[category]
                  ? Math.round((categoryProgress[category].completed / categoryProgress[category].total) * 100)
                  : 0;
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{category}</span>
                      <span className="text-slate-400">{count} projects</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{progress}% complete</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No category data available
            </div>
          )}
        </div>

        {/* Priority Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Tasks by Priority</h3>
          {Object.entries(priorityCounts).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(priorityCounts).map(([priority, count]) => (
                <div key={priority}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{priority}</span>
                    <span className="text-slate-400">{count} tasks</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        priority.toLowerCase() === 'high' ? 'bg-red-500' :
                        priority.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(count / totalTasks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No priority data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-700/50 last:border-0 last:pb-0">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  item.type === 'project' ? 'bg-purple-500' :
                  item.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
                <div>
                  <div className="text-white font-medium">
                    {item.type === 'project' ? `Project: ${item.title}` : `Task: ${item.title}`}
                  </div>
                  <div className="text-sm text-slate-500">
                    {item.type === 'project' ? 'Project updated' : `Status: ${item.status}`} • {new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
