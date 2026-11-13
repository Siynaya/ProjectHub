import { Link } from 'react-router-dom';
import { FolderOpen, Calendar, CheckCircle, Clock, MoreVertical } from 'lucide-react';
import { calculateProgress, formatDate, getDaysUntilDeadline, isPastDue, getCategoryColor } from '../utils/helpers';

const ProjectCard = ({ project, onDelete }) => {
  const progress = calculateProgress(
    project.tasks?.length || 0,
    project.tasks?.filter(t => t.status === 'completed').length || 0
  );

  const deadline = project.deadline;
  const daysUntilDeadline = getDaysUntilDeadline(deadline);
  const pastDue = isPastDue(deadline);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10 group">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${getCategoryColor(project.category)} shadow-lg`}>
              <FolderOpen size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-1 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-slate-400">{project.category || 'General'}</p>
            </div>
          </div>
          <div className="relative">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 mb-4">
          {project.description || 'No description provided.'}
        </p>

        <div className="space-y-3 mb-4">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Progress</span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className={pastDue ? 'text-red-400' : 'text-slate-400'} />
              <span className={pastDue ? 'text-red-400' : ''}>
                {pastDue ? 'Overdue' : daysUntilDeadline === 0 ? 'Due today' : daysUntilDeadline < 7 ? `Due in ${daysUntilDeadline} days` : `Due ${formatDate(deadline)}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-slate-400" />
              <span>
                {project.tasks?.filter(t => t.status === 'completed').length || 0} / {project.tasks?.length || 0} tasks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-1 rounded-full font-medium ${
              project.status === 'completed' ? 'bg-emerald-400/10 text-emerald-400' :
              project.status === 'active' ? 'bg-blue-400/10 text-blue-400' :
              'bg-gray-400/10 text-gray-400'
            }`}>
              {project.status || 'Active'}
            </span>
            <span className="px-2.5 py-1 rounded-full font-medium bg-purple-400/10 text-purple-400">
              {project.priority || 'Medium'} priority
            </span>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
