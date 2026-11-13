/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return 'No date set';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculate progress percentage
 * @param {number} total - Total number of items
 * @param {number} completed - Completed number of items
 * @returns {number} Progress percentage
 */
export function calculateProgress(total, completed) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Get color for priority level
 * @param {string} priority - Priority level (Low, Medium, High)
 * @returns {string} Tailwind color class
 */
export function getPriorityColor(priority) {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

/**
 * Get priority badge text
 * @param {string} priority - Priority level
 * @returns {string} Badge text
 */
export function getPriorityText(priority) {
  return priority?.toUpperCase() || 'LOW';
}

/**
 * Get color for status
 * @param {string} status - Status (todo, in-progress, completed)
 * @returns {string} Tailwind color class
 */
export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-emerald-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'todo':
    default:
      return 'bg-gray-500';
  }
}

/**
 * Get category color for projects
 * @param {string} category - Category name
 * @returns {string} Tailwind color class
 */
export function getCategoryColor(category) {
  const colors = {
    'Development': 'bg-blue-500',
    'Design': 'bg-purple-500',
    'Marketing': 'bg-pink-500',
    'Content': 'bg-orange-500',
    'Research': 'bg-cyan-500',
    'Other': 'bg-gray-500',
  };
  return colors[category] || colors['Other'];
}

/**
 * Get category badge text
 * @param {string} category - Category name
 * @returns {string} Category text
 */
export function getCategoryText(category) {
  return category || 'Other';
}

/**
 * Check if a date is past due
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if past due
 */
export function isPastDue(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
}

/**
 * Get days until deadline
 * @param {string|Date} date - Deadline date
 * @returns {number|null} Days until deadline or null
 */
export function getDaysUntilDeadline(date) {
  if (!date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(date);
  deadline.setHours(0, 0, 0, 0);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
