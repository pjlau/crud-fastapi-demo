import React, { useState } from 'react';
import axios from 'axios';

function TaskList({ tasks, fetchTasks }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDone, setEditDone] = useState(false);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDone(task.done);
  };

  const handleUpdate = async (taskId) => {
    try {
      await axios.put(`/tasks/${taskId}`, {
        title: editTitle,
        description: editDescription,
        done: editDone,
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          {editingTask === task.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description"
              />
              <label>
                Done:
                <input
                  type="checkbox"
                  checked={editDone}
                  onChange={(e) => setEditDone(e.target.checked)}
                />
              </label>
              <div>
                <button onClick={() => handleUpdate(task.id)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.done ? 'Done' : 'Pending'}</p>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;