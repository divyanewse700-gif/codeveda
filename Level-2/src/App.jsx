import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4040/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading tasks:", error);
        setError("Unable to load tasks.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4040/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div>
      <h1>Codveda Task Manager</h1>
      {error && <p>{error}</p>}

      <TaskForm onTaskAdded={(newTask) => setTasks([...tasks, newTask])} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default App;
