import { IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/DoNotDisturb';
import SaveIcon from '@mui/icons-material/Save';
import styled from "@emotion/styled";

const TaskItem = (props) => {
    const {task, tasks, setTasks, index} = props;
    const [taskName, setTaskName] = useState(task.name);
    const [editState, setEditState] = useState(false);

    const deleteItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];

        newTasks.splice(index, 1);

        setTasks(newTasks);
    }

    const saveItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        const newTask = {...newTasks[index]};

        newTask.name = taskName;
        newTasks[index] = newTask;

        setTasks(newTasks);
        setEditState(false);
    }

    const editItem = (e) => {
        e.preventDefault();
        setEditState(true);
    }

    const cancelItem = (e) => {
        e.preventDefault();
        setTaskName(task.name);
        setEditState(false);
    }

    const handleTaskNameOnChange = (e) => {
        const newTask = e.target.value;
        setTaskName(newTask);
    }

    if (!task) {
        return null;
    }

    return (
        <li>
            {editState ? (
                <>
                    <EditTaskName autoFocus type="text" value={taskName} onChange={(e) => handleTaskNameOnChange(e)} />
                    <IconButton onClick={(e) => cancelItem(e)}>
                        <CancelIcon color="error" />
                    </IconButton>
                    <IconButton onClick={(e) => saveItem(e)}>
                        <SaveIcon color="success" />
                    </IconButton>
                </>
            ) : (
                <>
                    <TaskName>{task.name}</TaskName>
                    <IconButton onClick={(e) => deleteItem(e)}>
                        <DeleteForeverIcon color="error" />
                    </IconButton>
                    <IconButton onClick={(e) => editItem(e)}>
                        <EditIcon color="success" />
                    </IconButton>
                </>
            )}
            
        </li>
    );
}

export default TaskItem;

const TaskName = styled.div`
    font-size: 14px;
`

const EditTaskName = styled.input`
    font-size: 14px;
`