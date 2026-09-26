import { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4040/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const newTask = await response.json();

    onTaskAdded(newTask);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Enter task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
