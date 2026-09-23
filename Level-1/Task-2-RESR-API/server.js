const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 4040;

app.use(express.json());
app.use(cors());

app.delete("/test-delete", (req, res) => {
  res.json({
    message: "DELETE works in server.js"
  });
});
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Codeveda Task Manager API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

