"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Collapse, Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
    deadline: new Date("2023/1/22"),
    completed: false,
    user_id: "0001",
    community_id: community_id,
  };
}

const rows = [
  createData("000001", "Task01", undefined, "COMM"),
  createData("000002", "Task02", "Hello", undefined),
  createData("000003", "Task03", undefined, "COMM"),
  createData("000004", "Task04", undefined, "COMM"),
  createData("000005", "Task04", undefined, "COMM"),
  createData("000006", "Task04", undefined, "COMM"),
  createData("000007", "Task04", undefined, "COMM"),
  createData("000008", "Task04", undefined, "COMM"),
  createData("000009", "Task04", undefined, "COMM"),
  createData("000010", "Task04", undefined, "COMM"),
  createData("000011", "Task04", undefined, "COMM"),
  createData("000012", "Task04", undefined, "COMM"),
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
        <TableCell className="w-40">{row.deadline.toUTCString()}</TableCell>
        <TableCell>{row.completed}</TableCell>
        <TableCell>{row.community_id}</TableCell>
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

export default function TaskTable({ taskType }: { taskType: string }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Check</TableCell>
            <TableCell>Community</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
