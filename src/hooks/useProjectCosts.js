import { useMemo } from 'react';

const STORAGE_KEY = 'sow_project_types';

function getStoredTypes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function calculateInternalCost(projectType) {
  const data = getStoredTypes();
  const breakdown = data[projectType] || [];
  return breakdown.reduce((sum, item) => sum + item.hours * item.rate, 0);
}

export default function useProjectCosts() {
  const data = useMemo(() => getStoredTypes(), []);

  const projectTypes = Object.keys(data).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key
  }));

  const getInternalCost = (projectType) => calculateInternalCost(projectType);

  const getBreakdown = (projectType) => getStoredTypes()[projectType] || [];

  return {
    projectTypes,
    getInternalCost,
    getBreakdown
  };
}
