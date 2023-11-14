"use client";

import { CommunityApi } from "@/libs/interface/community";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
interface Task {
  title: string;
  id: string;
  description: string;
  deadline: any;
}

export default function TaskCommu(data: any) {
  console.log(data);
  return (
    <div>
      {data.data.length >= 0 ? (
        data.data.map((community: Task) => (
          <CommunityCard key={community.id} community={community} />
        ))
      ) : (
        <Typography>No Community Task Yet</Typography>
      )}
    </div>
  );
}

function CommunityCard({ community }: { community: Task }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("Left Community!");
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
    <Card variant="outlined">
      <Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {community.title}
          </Typography>

          <Typography variant="body2">{community.description}</Typography>
        </CardContent>

        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={handleClose}>
          <Alert
            severity="success"
            sx={{ width: "100%" }}
            onClose={handleClose}>
            {successText}
          </Alert>
        </Snackbar>
      </Fragment>
    </Card>
  );
}
