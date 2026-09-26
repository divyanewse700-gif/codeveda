function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskCard;
