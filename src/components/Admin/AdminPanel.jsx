import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'sow_project_types';

export default function AdminPanel() {
  const [types, setTypes] = useState({});
  const [newType, setNewType] = useState('');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    setTypes(stored);
  }, []);

  const saveTypes = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTypes(updated);
  };

  const handleAddType = () => {
    if (!newType.trim()) return;
    const updated = { ...types, [newType.toLowerCase()]: [] };
    saveTypes(updated);
    setNewType('');
  };

  const handleAddResource = (typeKey) => {
    const updated = {
      ...types,
      [typeKey]: [...(types[typeKey] || []), { role: '', hours: 0, rate: 0 }]
    };
    saveTypes(updated);
  };

  const handleResourceChange = (typeKey, index, field, value) => {
    const updated = { ...types };
    const parsedValue =
      field === 'hours' || field === 'rate' ? parseFloat(value) || 0 : value;
    updated[typeKey][index][field] = parsedValue;
    saveTypes(updated);
  };

  const handleDeleteType = (typeKey) => {
    const updated = { ...types };
    delete updated[typeKey];
    saveTypes(updated);
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="New project type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddType}>
          Add Project Type
        </button>
      </div>

      {Object.keys(types).map((typeKey) => (
        <div key={typeKey} className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>{typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}</strong>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteType(typeKey)}
            >
              Delete
            </button>
          </div>
          <div className="card-body">
            {types[typeKey].map((resource, idx) => (
              <div key={idx} className="row mb-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    value={resource.role}
                    onChange={(e) =>
                      handleResourceChange(typeKey, idx, 'role', e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Hours"
                    step="0.01"
                    value={resource.hours}
                    onChange={(e) =>
                      handleResourceChange(typeKey, idx, 'hours', e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Rate"
                    step="0.01"
                    value={resource.rate}
                    onChange={(e) =>
                      handleResourceChange(typeKey, idx, 'rate', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <button
              className="btn btn-secondary mt-2"
              onClick={() => handleAddResource(typeKey)}
            >
              Add Resource
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
// This component allows admins to manage project types and their associated resources.