import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  ListTodo,
  Settings,
  Menu,
  X,
  BarChart3
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [projects] = useLocalStorage('projects', []);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderOpen, label: 'My Projects' },
    { path: '/tasks', icon: ListTodo, label: 'All Tasks' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const activeClass = "bg-purple-600 text-white shadow-lg shadow-purple-900/20";
  const inactiveClass = "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-800">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/30">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-white tracking-tight">ProjectHub</h1>
              <p className="text-xs text-slate-500">Personal Dashboard</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
              Main
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-white" : "text-slate-400 group-hover:text-white"} />
                  <span className="font-medium">{item.label}</span>
                  {item.path === '/projects' && (
                    <span className="ml-auto bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-full">
                      {projects.length}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
              Stats
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 mx-2">
              <div className="text-slate-400 text-sm mb-2">Total Projects</div>
              <div className="text-2xl font-bold text-white mb-1">{projects.length}</div>
              <div className="text-xs text-green-400">
                {projects.filter(p => p.status === 'active').length} Active
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-slate-500 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
