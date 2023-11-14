"use client";
import { createCommu, createCommuTask } from "@/libs/api/community";
import { AddTask } from "@mui/icons-material";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, Fragment } from "react";

export default function Commu({ data }: { data: any }) {
  const [openAddTask, setAddTask] = useState(false);
  return (
    <div>
      <div className="mb-5 mx-5 flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          Community Task List
        </Typography>
        <Button variant="outlined" onClick={() => setAddTask(true)}>
          Add Community Task
        </Button>
      </div>

      <AddCommunity openState={[openAddTask, setAddTask]} id={data.id} />
    </div>
  );
}

function AddCommunity({
  openState: [open, setOpen],
  id,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  id: string;
}) {
  const { data: session } = useSession();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const router = useRouter();
  interface Taskna {
    title: string;
    description: string;
    deadline: any;
  }
  const [task, setTask] = useState<Taskna>({
    title: "",
    description: "",
    deadline: "",
  });
  const onChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    console.log(task);

    try {
      const res = await createCommuTask(
        session?.user.accessToken,
        task.title,
        task.description,
        task.deadline,
        id
      );
      if (res) {
        setSuccessText("Add Community Task Completed!");
        setSnackOpen(true);
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "background.paper",
              border: "1px solid #3f93e8",
              boxShadow: 24,
              p: 4,
            }}
            className="rounded-xl">
            <form action={onSubmit} className="flex flex-col gap-4">
              <Typography variant="h6" className="mb-2">
                Add Community
              </Typography>
              <TextField
                id="title"
                name="title"
                label="Title"
                onChange={onChange}
                value={task.title === "" ? null : task.title}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                onChange={onChange}
                value={task.description === "" ? null : task.description}
                fullWidth
                sx={{ display: "block" }}
                multiline
                minRows={2}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Basic date time picker"
                  value={dayjs(task.deadline)}
                  onChange={(newValue) => {
                    if (newValue != null) {
                      setTask({ ...task, deadline: newValue.toDate() });
                    }
                  }}
                />
              </LocalizationProvider>

              <Button type="submit">Add Task</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successText}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
