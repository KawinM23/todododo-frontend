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
} from "@mui/material";

import { useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";

interface Routine {
  id: string;
  title: string;
  description?: string;
  checktime?: Date;
  typena: string;

  user_id: string;
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
  };
}

const rows = [
  createData("000001", "Rountine01", undefined),
  createData("000002", "Rountine02", "Hello"),
  createData("000003", "Rountine01", undefined),
  createData("000004", "Rountine02", "Hello"),
];

export default function RoutineList() {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className="h-[50%]">
      <div className="w-full flex flex-row justify-between">
        <Typography variant="h5">Routine Lists</Typography>
        <Button onClick={() => setOpenAddTask(true)}>Add Routine</Button>
        <AddRoutine openState={[openAddTask, setOpenAddTask]} />
      </div>
      <TableContainer component={Paper} sx={{ height: "90%" }}>
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
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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
        <TableCell>{row.typena}</TableCell>
        <TableCell sx={{ width: 70 }} align="center">
          <IconButton aria-label="done" size="small">
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
      <AddRoutine
        openState={[openEditTask, setOpenEditTask]}
        routineProp={row}
      />
    </React.Fragment>
  );
}

function AddRoutine({
  openState: [open, setOpen],
  routineProp: routineProp,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  routineProp?: Routine;
}) {
  const [routine, setRoutine] = useState({
    title: routineProp?.title || "",
    description: routineProp?.description || "",
    typena: routineProp?.typena || "",
  });

  const onChange = (e: any) => {
    setRoutine({ ...routine, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (routineProp) {
        await console.log("Edit ", routine);
      } else {
        await console.log("Add ", routine);
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
              {routineProp ? "Edit Routine" : "Add Routine"}
            </Typography>
            <TextField
              id="title"
              name="title"
              label="Title"
              onChange={onChange}
              value={routine.title}
              fullWidth
              sx={{ display: "block" }}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              onChange={onChange}
              value={routine.description}
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
              value={routine.typena}
              onChange={onChange}
            >
              <MenuItem value={"daily"}>daily</MenuItem>
              <MenuItem value={"weekly"}>weekly</MenuItem>
              <MenuItem value={"monthly"}>monthly</MenuItem>
            </Select>
            <Button type="submit">
              {routineProp ? "Edit Routine" : "Add Routine"}
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
