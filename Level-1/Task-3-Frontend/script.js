const API_URL = "http://localhost:4040/api/tasks";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Get tasks from the API
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<p>No tasks available.</p>";
      return;
    }

    tasks.forEach((task) => {
      const taskCard = document.createElement("div");

      taskCard.className = "task-card";

      taskCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <button onclick="deleteTask(${task.id})">Delete</button>
`;

      taskList.appendChild(taskCard);
    });
  } catch (error) {
    console.error("Error loading tasks:", error);

    taskList.innerHTML = "<p>Unable to load tasks.</p>";
  }
}

// Add a new task
taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    taskForm.reset();

    loadTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Load tasks when page opens
loadTasks();
