"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  ButtonGroup,
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

//Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { useSession } from "next-auth/react";

import {
  addHabit,
  adjustScoreHabit,
  deleteHabit,
  editHabit,
} from "@/libs/api/habit";
import { useRouter } from "next/navigation";
interface Habit {
  id: string;
  title: string;
  description?: string;
  score: number;

  user_id: string;
}

function createData(
  id: string,
  title: string,
  description: string | undefined
): Habit {
  return {
    id: id,
    title: title,
    description: description,
    score: 0,
    user_id: "0001",
  };
}

const rows = [
  createData("000001", "Habit01", undefined),
  createData("000002", "Habit02", "Hello"),
  createData("000003", "Habit01", undefined),
  createData("000004", "Habit02", "Hello"),
  createData("000005", "Habit01", undefined),
  createData("000006", "Habit02", "Hello"),
];

export default function HabitList({ habits }: { habits: Habit[] }) {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className="h-[42vh]">
      <div className="w-full flex flex-row justify-between">
        <Typography variant="h5">Habit Lists</Typography>
        <Button onClick={() => setOpenAddTask(true)}>Add Habit</Button>
        <AddTask openState={[openAddTask, setOpenAddTask]} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Score</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((row) => (
              <Row key={row.id} row={row} />
            ))}
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

  const increaseScore = async () => {
    try {
      await adjustScoreHabit(row.id, true);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseScore = async () => {
    try {
      await adjustScoreHabit(row.id, false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      setOpen(false);
      await deleteHabit(row.id);
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
        <TableCell>{row.score}</TableCell>
        <TableCell sx={{ width: 100 }}>
          <ButtonGroup aria-label="outlined primary button group">
            <Button onClick={increaseScore}>+</Button>
            <Button onClick={decreaseScore}>-</Button>
          </ButtonGroup>
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
  taskProp?: Habit;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [task, setTask] = useState({
    title: taskProp?.title || "",
    description: taskProp?.description || "",
    score: taskProp?.score || 0,
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

  const onSubmit = async () => {
    try {
      if (taskProp) {
        console.log("Edit", task.title);
        if (session?.user.sub) {
          const res = await editHabit({
            ...task,
            user_id: session?.user.sub,
            id: taskProp.id,
          });
          if (res != null) {
            setSuccessText("Edit Habit Completed!");
            setSnackOpen(true);
            setOpen(false);
            router.refresh();
          }
        }
      } else {
        console.log("Add", task.title);
        if (session?.user.sub) {
          const res = await addHabit({
            ...task,
            user_id: session?.user.sub,
          });
          if (res != null) {
            setSuccessText("Add Habit Completed!");
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
                {taskProp ? "Edit Habit" : "Add Habit"}
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
              <Button type="submit">
                {taskProp ? "Edit Habit" : "Add Habit"}
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
