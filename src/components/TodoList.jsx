import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Modal,
  TextField,
  Box,
  IconButton,
  Card,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

const ActionIcon = IconButton;

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSummary, setTaskSummary] = useState("");
  console.log("base", BASE_URL);

  const token = localStorage.getItem("token");

  //Task Creation
  async function createTask() {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/task/createtask`,
        {
          title: taskTitle,
          summary: taskSummary,
        },
        {
          headers: {
            "Content-Type": "application/json",
            atoken: token,
          },
        }
      );
      setTasks([...tasks, response.data]);
      toast.success("Task created successfully");
      setTaskTitle("");
      setTaskSummary("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setOpened(false);
    }
  }

  //Task Deletion
  async function deleteTask(taskId) {
    try {
      await axios.delete(`${BASE_URL}/api/task/deletetask/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          atoken: token,
        },
      });
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function editTask(task) {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskSummary(task.summary);
    setOpened(true);
  }

  //Task Updation
  async function updateTask() {
    try {
      await axios.put(
        `${BASE_URL}/api/task/updatetask/${editingTask._id}`,
        {
          title: taskTitle,
          summary: taskSummary,
        },
        {
          headers: {
            "Content-Type": "application/json",
            atoken: token,
          },
        }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === editingTask._id
          ? { ...task, title: taskTitle, summary: taskSummary }
          : task
      );
      setTasks(updatedTasks);
      toast.success("Task updated successfully");
      setEditingTask(null);
      setTaskTitle("");
      setTaskSummary("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setOpened(false);
    }
  }

  //Task Status Update
  async function handleStatus(taskId) {
    try {
      await axios.put(
        `${BASE_URL}/api/task/updatetaskstatus/${taskId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            atoken: token,
          },
        }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: "completed" } : task
      );
      setTasks(updatedTasks);
      toast.success("Task status updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //All Tasks load
  async function loadTasks() {
    try {
      const response = await axios.get(`${BASE_URL}/api/task/fetchalltasks`, {
        headers: {
          "Content-Type": "application/json",
          atoken: token,
        },
      });
      setTasks(response.data.reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [tasks]);

  return (
    <Container maxWidth="md" sx={{ marginTop: "94px" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center" }}>
        My Tasks
      </Typography>
      <Button
        onClick={() => {
          setEditingTask(null);
          setOpened(true);
        }}
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: "14px" }}
      >
        Create New Task
      </Button>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card key={task._id} style={{ padding: "10px", margin: "14px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography variant="h6" align="left" sx={{ marginLeft: "12px" }}>
                {task.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ActionIcon onClick={() => editTask(task)}>
                  <Edit />
                </ActionIcon>
                <ActionIcon onClick={() => deleteTask(task._id)}>
                  <Delete />
                </ActionIcon>
              </Box>
            </Box>
            <Typography
              color="text.secondary"
              variant="body1"
              align="left"
              style={{ margin: "8px 12px" }}
            >
              {task.summary}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  color: task.status === "pending" ? "warning.main" : "green",
                }}
              >
                {task.status}
              </Typography>
              {task.status === "completed" ? null : (
                <Button
                  onClick={() => handleStatus(task._id)}
                  variant="contained"
                  color="primary"
                >
                  Mark Completed
                </Button>
              )}
            </Box>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          style={{
            marginTop: "16px",
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          You have no tasks
        </Typography>
      )}
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 4,
            outline: "none",
          }}
        >
          <TextField
            fullWidth
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
            label="Title"
            variant="outlined"
            style={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            value={taskSummary}
            onChange={(e) => setTaskSummary(e.target.value)}
            placeholder="Task Summary"
            label="Summary"
            variant="outlined"
            style={{ marginBottom: "16px" }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setOpened(false)} variant="outlined">
              Cancel
            </Button>
            <Button
              disabled={!taskTitle.trim() || !taskSummary.trim()}
              onClick={editingTask ? updateTask : createTask}
              variant="contained"
              color="primary"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
