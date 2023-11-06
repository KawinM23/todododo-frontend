"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IconButton,
  Collapse,
  Box,
  Button,
  ButtonGroup,
  Backdrop,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  createData("000001", "Rountine01", undefined),
  createData("000002", "Rountine02", "Hello"),
  createData("000003", "Rountine01", undefined),
  createData("000004", "Rountine02", "Hello"),
];

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.score}</TableCell>
        <TableCell>
          <ButtonGroup aria-label="outlined primary button group">
            <Button>+</Button>
            <Button>-</Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}></Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RoutineList() {
  return (
    <div className="h-[50%]">
      <AddRoutine />
      <TableContainer component={Paper} sx={{ height: "90%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Score</TableCell>
              <TableCell></TableCell>
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

function AddRoutine() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [routine, setRoutine] = useState({ title: "", description: "" });

  const onChange = (e: any) => {
    setRoutine({ ...routine, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await console.log("Submitted");
    } catch (error) {}
  };

  return (
    <div className="w-full text-right flex flex-row justify-between">
      <Typography variant="h5">Routine Lists</Typography>
      <Button onClick={handleOpen}>Add Routine</Button>
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
              <h1 className="mb-2">Add Task</h1>
              <TextField
                id="title"
                name="title"
                label="Title"
                onChange={onChange}
                value={routine.title || ""}
                sx={{ display: "block" }}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                onChange={onChange}
                value={routine.description || ""}
                sx={{ display: "block" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker label="Basic date time picker" />
              </LocalizationProvider>
              <Button type="submit">Add Task</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
