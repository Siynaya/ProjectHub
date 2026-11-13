import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Header = ({ onMenuClick }) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [notifications] = useLocalStorage('notifications', []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="h-20 px-6 flex items-center justify-between bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden sm:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
