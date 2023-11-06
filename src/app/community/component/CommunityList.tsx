import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

export default function CommunityList({ title }: { title: string }) {
  return (
    <div className="mb-5">
      <Typography variant="h5" className="mb-5">
        {title}
      </Typography>
      <div className="grid grid-cols-3 gap-5">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
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
        <CardActions>
          <Button size="small">Join</Button>
        </CardActions>
      </Fragment>
    </Card>
  );
}
