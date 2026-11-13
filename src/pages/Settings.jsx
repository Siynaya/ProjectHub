import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Trash2, Moon, Sun, AlertCircle, CheckCircle2 } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const [projects] = useLocalStorage('projects', []);
  const [tasks] = useLocalStorage('tasks', []);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleClearData = () => {
    setDeleting(true);
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const totalProjects = projects.length;
  const totalTasks = tasks.length;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your application preferences and data</p>
      </div>

      {/* Appearance */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Moon size={24} className="text-purple-400" />
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-white">Dark Mode</div>
            <div className="text-sm text-slate-400 mt-1">Use dark theme for the application</div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              darkMode ? 'bg-purple-600' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Trash2 size={24} className="text-red-400" />
          Data Management
        </h2>

        {/* Storage Info */}
        <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Storage Usage</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-slate-400 text-sm mb-1">Projects</div>
              <div className="text-2xl font-bold text-white">{totalProjects}</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-slate-400 text-sm mb-1">Tasks</div>
              <div className="text-2xl font-bold text-white">{totalTasks}</div>
            </div>
          </div>
        </div>

        {/* Clear Data */}
        <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/20 rounded-xl flex-shrink-0">
              <AlertCircle className="text-red-500" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-400 mb-2">Delete All Data</h3>
              <p className="text-sm text-slate-400 mb-4">
                This will permanently delete all your projects, tasks, and settings from this browser. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Delete All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CheckCircle2 size={24} className="text-blue-400" />
          About
        </h2>
        <div className="space-y-3 text-sm text-slate-400">
          <p><strong className="text-white">ProjectHub</strong> v1.0.0</p>
          <p>A personal project management dashboard for tracking your projects and tasks.</p>
          <p className="pt-4 border-t border-slate-700/50">
            Data is stored locally in your browser using LocalStorage. No data is sent to any server.
          </p>
        </div>
      </div>

      {/* Confirm Clear Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Confirm Clear Data</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-400">
                Are you sure you want to delete all your data? This action cannot be undone.
              </p>
              <p className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg">
                This will delete {totalProjects} project(s) and {totalTasks} task(s).
              </p>
            </div>
            <div className="p-6 border-t border-slate-700 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all font-medium"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
