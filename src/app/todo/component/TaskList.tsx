"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Fade,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  Popper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

//Icons
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { addTask, completeTask, deleteTask, editTask } from "@/libs/api/task";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  completed: boolean;
  user_id: string;
  community_id?: string;
}

function createData(
  id: string,
  title: string,
  description: string | undefined,
  community_id: string | undefined
): Task {
  return {
    id: id,
    title: title,
    description: description,
    deadline: new Date("October 13, 2022 11:13:00"),
    completed: false,
    user_id: "0001",
    community_id: community_id,
  };
}

// const rows = [
//   createData("000001", "Task01", undefined, undefined),
//   createData(
//     "000002",
//     "Task02",
//     "Hello this is the task that you need to do. ",
//     undefined
//   ),
//   createData("000003", "Task03", undefined, undefined),
//   createData("000004", "Task04", undefined, undefined),
//   createData("000005", "Task04", undefined, undefined),
//   createData("000006", "Task04", undefined, undefined),
//   createData("000007", "Task04", undefined, undefined),
//   createData("000008", "Task04", undefined, undefined),
//   createData("000009", "Task04", undefined, "COMM"),
//   createData("000010", "Task04", undefined, "COMM"),
//   createData("000011", "Task04", undefined, "COMM"),
//   createData("000012", "Task04", undefined, "COMM"),
// ];

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className="w-1/2">
      <div className="w-full flex flex-row justify-between">
        <Typography variant="h5">Task Lists</Typography>
        <Button onClick={() => setOpenAddTask(true)}>Add Task</Button>
        <AddTask openState={[openAddTask, setOpenAddTask]} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell align="center">Done</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => {
              if (!row.completed) {
                return <Row key={row.id} row={row} />;
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const router = useRouter();
  const { row } = props;
  const [expand, setExpand] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const doneHandler = async () => {
    try {
      await completeTask(row.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      setOpen(false);
      await deleteTask(row.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ width: 50 }}>
          {(row.description || row.community_id) && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setExpand(!expand)}
            >
              {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{dayjs(row.deadline).format("DD/MM/YYYY h:mm A")}</TableCell>
        <TableCell sx={{ width: 70 }} align="center">
          <IconButton aria-label="done" size="small" onClick={doneHandler}>
            <CheckIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
        <TableCell sx={{ width: 70 }}>
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={expand ? "composition-menu" : undefined}
            aria-expanded={expand ? "true" : undefined}
            aria-haspopup="true"
            onClick={() => {
              setOpen((prevOpen) => !prevOpen);
              console.log();
            }}
          >
            <MoreVertIcon fontSize="inherit" />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: 20 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener
                    onClickAway={() => {
                      setOpen(false);
                    }}
                  >
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <MenuItem
                        onClick={() => {
                          setOpen(false);
                          setOpenEditTask(true);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem onClick={deleteHandler}>Delete</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography>{row.description}</Typography>
              {row.community_id && (
                <Typography>Community: {row.community_id}</Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <AddTask openState={[openEditTask, setOpenEditTask]} taskProp={row} />
    </React.Fragment>
  );
}

function AddTask({
  openState: [open, setOpen],
  taskProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  taskProp?: Task;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [task, setTask] = useState({
    title: taskProp?.title || "",
    description: taskProp?.description || "",
    deadline: taskProp?.deadline || new Date(),
  });

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const onChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  console.log(taskProp);

  const onSubmit = async () => {
    try {
      if (taskProp) {
        console.log("Edit", task.title);
        if (session?.user.sub) {
          const res = await editTask({
            ...task,
            user_id: session?.user.sub,
            completed: taskProp.completed,
            id: taskProp.id,
          });
          if (res != null) {
            setSuccessText("Edit Task Completed!");
            setSnackOpen(true);
            setOpen(false);
            router.refresh();
          }
        }
      } else {
        console.log("Add", task.title);
        if (session?.user.sub) {
          const res = await addTask({
            ...task,
            user_id: session?.user.sub,
          });
          if (res != null) {
            setSuccessText("Add Task Completed!");
            setSnackOpen(true);
            setOpen(false);
            router.refresh();
          }
        }
      }
    } catch (error) {}
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
        }}
      >
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
            className="rounded-xl"
          >
            <form action={onSubmit} className="flex flex-col gap-4">
              <Typography variant="h6" className="mb-2">
                {taskProp ? "Edit Task" : "Add Task"}
              </Typography>
              <TextField
                id="title"
                name="title"
                label="Title"
                onChange={onChange}
                value={task.title}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                onChange={onChange}
                value={task.description}
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
              <Button type="submit">
                {taskProp ? "Edit Task" : "Add Task"}
              </Button>
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
