import { useEffect, useState } from "react";
import './App.css';
import { TextField, Button, Grid, Box } from "@mui/material";
import styled from "@emotion/styled";
import TaskItem from "./components/TaskItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [taskName, setTaskName] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("https://todocraft.ddev.site/tasks.json");
    const tasks = await response.json();

    if (tasks?.data) {
      setTasks(tasks.data);
    }
    console.log("TASKS FORM API", tasks);
  }

  useEffect(() => {
    //fetchTasks();
  }, []);

  const valueChange = (event) => {
    const newValue = event.target.value;
    setTaskName(newValue);
  }

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift({
      id: uuidv4(),
      name: task,
    });

    setTasks(newTasks);
    setTaskName("");
  }

  return (
    <div className="App">
      <div id="title">
        <h1>Agen-DUH!</h1>
        <p>Here for you when you forget something!</p>
      </div>
      <div id="todo-app">
        <form>
          <StyledGrid container justifyContent={"center"} alignItems={"center"}>
            <Grid item>
              <StyledInput
                size="small"
                type="text"
                id="new-task"
                placeholder="What's new?"
                value={taskName}
                onChange={valueChange}
              />
            </Grid>
            <Grid item>
              <StyledButton
                size="large"
                id="add-task"
                variant="outlined"
                onClick={(e) => handleAddTask(e, taskName)}
              >+</StyledButton>
            </Grid>
          </StyledGrid>

          <ul id="task-list">
            {tasks.map((task, index) => {
              return (
                <TaskItem key={`task-${task.id}-${index}`} onClick={(event) => valueChange(event)} task={task} tasks={tasks} setTasks={setTasks} index={index} />
              )
            })}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default App;

const StyledInput = styled(TextField)`
  height: 40px;
  width: 200px;
  border-color: rgb(180, 136, 74);
  background-color: rgb(246, 242, 231);
`;

const StyledButton = styled(Button)`
  font-family: inherit;
  width: fit-content;
  height: 40px;
  padding: 0px;
  margin: 4px;
  color: white;
  border: 2px solid rgb(59, 84, 79);
  background-color: rgb(59, 84, 79);
  border-radius: 20px;
`;

const StyledGrid = styled(Grid)`
  border-color: green;
`;
