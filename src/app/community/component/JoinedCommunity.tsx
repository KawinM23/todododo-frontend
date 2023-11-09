"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

export default function JoinedCommunity() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <CommunityCard />
      <CommunityCard />
      <CommunityCard />
    </div>
  );
}

function CommunityCard() {
  return (
    <Card variant="outlined">
      <Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            Community1
          </Typography>

          <Typography variant="body2">
            We're the most active community
          </Typography>
        </CardContent>
        <CardActions sx={{ float: "right" }}>
          <Button size="small">Leave</Button>
        </CardActions>
      </Fragment>
    </Card>
  );
}
