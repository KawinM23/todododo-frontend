"use client";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import { useState } from "react";
import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #3f93e8",
  boxShadow: 24,
  p: 4,
};

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: dayjs(),
  });

  const onChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await console.log(task);
    } catch (error) {}
  };

  return (
    <div className="w-full text-right">
      <Button onClick={handleOpen}>Add Task</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-xl">
            <form action={onSubmit} className="flex flex-col gap-4">
              <h1 className="mb-2">Add Task</h1>
              <TextField
                id="title"
                name="title"
                label="Title"
                onChange={onChange}
                value={task.title}
                sx={{ display: "block" }}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                onChange={onChange}
                value={task.description}
                sx={{ display: "block" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Basic date time picker"
                  value={task.deadline}
                  onChange={(newValue) => {
                    if (newValue != null) {
                      setTask({ ...task, deadline: newValue });
                    }
                  }}
                />
              </LocalizationProvider>
              <Button type="submit">Add Task</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
