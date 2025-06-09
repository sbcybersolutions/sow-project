import React, { useState, useEffect } from 'react';
import {
  getProjectTypes,
  addOrUpdateProjectType,
  deleteProjectType
} from '../../utils/projectCostStorage';

function AdminPanel() {
  const [projectTypes, setProjectTypes] = useState({});
  const [currentName, setCurrentName] = useState('');
  const [breakdown, setBreakdown] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setProjectTypes(getProjectTypes());
  }, []);

  const handleAddRow = () => {
    setBreakdown([...breakdown, { role: '', hours: 1, rate: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...breakdown];
    updated[index][field] = field === 'role' ? value : parseFloat(value);
    setBreakdown(updated);
  };

  const handleSave = () => {
    addOrUpdateProjectType(currentName, breakdown);
    setProjectTypes(getProjectTypes());
    resetForm();
  };

  const handleEdit = (name) => {
    setCurrentName(name);
    setBreakdown(projectTypes[name]);
    setEditing(true);
  };

  const handleDelete = (name) => {
    if (window.confirm(`Delete project type "${name}"?`)) {
      deleteProjectType(name);
      setProjectTypes(getProjectTypes());
    }
  };

  const resetForm = () => {
    setCurrentName('');
    setBreakdown([]);
    setEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: 'var(--primary-color)' }}>Admin: Manage Project Types</h2>

      <div className="card my-4 p-3">
        <h5>{editing ? 'Edit Project Type' : 'Add New Project Type'}</h5>

        <div className="mb-3">
          <label className="form-label">Project Type Name</label>
          <input
            type="text"
            className="form-control"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            disabled={editing} // prevent renaming
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Hours</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((item, i) => (
              <tr key={i}>
                <td>
                  <input
                    className="form-control"
                    value={item.role}
                    onChange={(e) => handleChange(i, 'role', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.hours}
                    onChange={(e) => handleChange(i, 'hours', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.rate}
                    onChange={(e) => handleChange(i, 'rate', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-3">
          <button className="btn btn-outline-secondary me-2" type="button" onClick={handleAddRow}>
            + Add Role
          </button>
          <button className="btn btn-primary me-2" type="button" onClick={handleSave} disabled={!currentName}>
            {editing ? 'Update' : 'Save'}
          </button>
          {editing && (
            <button className="btn btn-secondary" type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <h5>Existing Project Types</h5>
      <ul className="list-group">
        {Object.entries(projectTypes).map(([name, roles]) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={name}>
            <span>{name}</span>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(name)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(name)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
