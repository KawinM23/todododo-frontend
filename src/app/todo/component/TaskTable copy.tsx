"use client";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

interface Column {
  id: "title" | "description" | "deadline" | "check" | "community";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 170,
  },
  {
    id: "check",
    label: "check",
    minWidth: 170,
  },
];

interface Data {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  completed: boolean;
  user_id: string;
  community_id?: string;
}

function createData(title: string, deadline: Date, description?: string): Data {
  return {
    id: "1",
    title: title,
    description: description,
    deadline: deadline,
    completed: false,
    user_id: "",
    community_id: "",
  };
}

const rows = [
  createData("Task1", new Date(), "Hello"),
  createData("Task2", new Date(), "Hello"),
  createData("Task3", new Date(), "Hello"),
  createData("Task4", new Date(), "Hello"),
  createData("Task5", new Date(), "Hello"),
  createData("Task6", new Date(), "Hello"),
];

enum TaskType {
  "Normal",
  "NoDeadline",
  "Comminity",
}

export default function LOL({ taskType }: { taskType: string }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = null;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
