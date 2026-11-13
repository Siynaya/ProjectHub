const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    purple: 'from-purple-600 to-indigo-600 shadow-purple-900/20',
    blue: 'from-blue-600 to-cyan-600 shadow-blue-900/20',
    green: 'from-emerald-600 to-teal-600 shadow-emerald-900/20',
    orange: 'from-orange-500 to-amber-500 shadow-orange-900/20',
  };

  const changeColors = {
    positive: 'text-emerald-400 bg-emerald-400/10',
    negative: 'text-red-400 bg-red-400/10',
    neutral: 'text-slate-400 bg-slate-400/10',
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color] || colorClasses.purple} shadow-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${changeColors[changeType] || changeColors.neutral}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-slate-500 text-sm">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
