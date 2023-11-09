"use client";
import { useEffect, useRef, useState } from "react";
import {
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

export default function HabitList() {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className="h-[50%]">
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
              <TableCell>Action</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Row(props: { row: ReturnType<typeof createData> }) {
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
            <Button>+</Button>
            <Button>-</Button>
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
                      <MenuItem
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
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
  const [task, setTask] = useState({
    title: taskProp?.title || "",
    description: taskProp?.description || "",
    score: taskProp?.score || 0,
  });

  const onChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (taskProp) {
        await console.log("Edit ", task);
      } else {
        await console.log("Add ", task);
      }
    } catch (error) {}
  };

  return (
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
  );
}
