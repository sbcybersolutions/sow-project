const STORAGE_KEY = 'sow_project_types';

export function getProjectTypes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

export function saveProjectTypes(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addOrUpdateProjectType(name, breakdown) {
  const all = getProjectTypes();
  all[name.toLowerCase()] = breakdown;
  saveProjectTypes(all);
}

export function deleteProjectType(name) {
  const all = getProjectTypes();
  delete all[name.toLowerCase()];
  saveProjectTypes(all);
}
