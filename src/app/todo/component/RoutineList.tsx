"use client";
import * as React from "react";
import {
  IconButton,
  Collapse,
  Box,
  Button,
  Backdrop,
  Fade,
  Modal,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Popper,
  Select,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material";

import { Fragment, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useRouter } from "next/navigation";
import {
  addRoutine,
  completeRoutine,
  deleteRoutine,
  editRoutine,
} from "@/libs/api/routine";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";

interface Routine {
  id: string;
  title: string;
  description?: string;
  checktime?: Date | undefined;
  typena: string;

  user_id: string;
  completed: boolean;
}

function createData(
  id: string,
  title: string,
  description: string | undefined
): Routine {
  return {
    id: id,
    title: title,
    description: description,
    checktime: undefined,
    typena: "daily",
    user_id: "0001",
    completed: false,
  };
}

const rows = [
  createData("000001", "Rountine01", undefined),
  createData("000002", "Rountine02", "Hello"),
  createData("000003", "Rountine01", undefined),
  createData("000004", "Rountine02", "Hello"),
];

export default function RoutineList({ routines }: { routines: Routine[] }) {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className="h-[49%] flex flex-col">
      <div className="w-full flex flex-row justify-between">
        <Typography variant="h5">Routine Lists</Typography>
        <Button onClick={() => setOpenAddTask(true)}>Add Routine</Button>
        <AddRoutine openState={[openAddTask, setOpenAddTask]} />
      </div>
      <TableContainer component={Paper} className="flex-1">
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Done</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {routines.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Row(props: { row: Routine }) {
  const router = useRouter();
  const { row } = props;
  const [expand, setExpand] = useState(false);

  const [openEditTask, setOpenEditTask] = useState(false);

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const doneHandler = async () => {
    try {
      await completeRoutine(row.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      setOpen(false);
      await deleteRoutine(row.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ width: 50 }}>
          {row.description && (
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
        <TableCell>{row.typena}</TableCell>
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
                        <EditIcon sx={{ marginRight: 1 }} />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={deleteHandler}>
                        <DeleteIcon sx={{ marginRight: 1 }} />
                        Delete
                      </MenuItem>
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <AddRoutine openState={[openEditTask, setOpenEditTask]} taskProp={row} />
    </React.Fragment>
  );
}

function AddRoutine({
  openState: [open, setOpen],
  taskProp: taskProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  taskProp?: Routine;
}) {
  const { data: session } = useSession();
  const router = useRouter();

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

  const [task, setTask] = useState({
    title: taskProp?.title || "",
    description: taskProp?.description || "",
    typena: taskProp?.typena || "",
  });

  const onChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (taskProp) {
        console.log("Edit", task.title);
        if (session?.user.sub) {
          const res = await editRoutine({
            ...task,
            user_id: session?.user.sub,
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
          const res = await addRoutine({
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
                {taskProp ? "Edit Routine" : "Add Routine"}
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
              <InputLabel id="typena">Type</InputLabel>
              <Select
                id="typena"
                name="typena"
                label="Type"
                value={task.typena}
                onChange={onChange}
              >
                <MenuItem value={"daily"}>daily</MenuItem>
                <MenuItem value={"weekly"}>weekly</MenuItem>
                <MenuItem value={"monthly"}>monthly</MenuItem>
              </Select>
              <Button type="submit">
                {taskProp ? "Edit Routine" : "Add Routine"}
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
