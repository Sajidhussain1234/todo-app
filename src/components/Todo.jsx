import React, { useState, useRef, useEffect } from "react";
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
import { styled } from "@mui/system";
import { Delete, Edit } from "@mui/icons-material";

const ActionIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const taskTitle = useRef("");
  const taskSummary = useRef("");

  function createTask() {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);

    saveTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);
    setOpened(false);
  }

  function deleteTask(index) {
    const clonedTasks = [...tasks];
    clonedTasks.splice(index, 1);
    setTasks(clonedTasks);
    saveTasks(clonedTasks);
  }

  function loadTasks() {
    const loadedTasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(loadedTasks);
    if (parsedTasks) {
      setTasks(parsedTasks);
    }
  }

  function saveTasks(tasksToSave) {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  }

  function editTask(index) {
    const taskToEdit = tasks[index];
    setEditingTask({ ...taskToEdit, index });
    setOpened(true);
  }

  function updateTask() {
    const updatedTasks = tasks.map((task, index) =>
      index === editingTask.index
        ? {
            ...task,
            title: taskTitle.current.value,
            summary: taskSummary.current.value,
          }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setOpened(false);
    setEditingTask(null);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: 40 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          My Tasks
        </Typography>
      </Box>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Card key={index} style={{ marginTop: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ marginLeft: "14px" }}>
                {task.title
                  ? task.title
                  : "No title was provided for this task"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ActionIcon onClick={() => editTask(index)}>
                  <Edit />
                </ActionIcon>
                <ActionIcon onClick={() => deleteTask(index)}>
                  <Delete />
                </ActionIcon>
              </Box>
            </Box>
            <Typography
              color="text.secondary"
              variant="body1"
              style={{ marginTop: "8px" }}
            >
              {task.summary
                ? task.summary
                : "No summary was provided for this task"}
            </Typography>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          style={{ marginTop: "16px", color: "text.secondary" }}
        >
          You have no tasks
        </Typography>
      )}
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
        Create Task
      </Button>
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
            inputRef={taskTitle}
            defaultValue={editingTask?.title || ""}
            placeholder="Task Title"
            label="Title"
            variant="outlined"
            style={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            inputRef={taskSummary}
            defaultValue={editingTask?.summary || ""}
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
