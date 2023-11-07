import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

export default function CommunityList() {
  return (
    <div className="mb-5">
      <div className="mb-5 flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          Discover Communities!
        </Typography>
        <Button variant="outlined">Join with Code</Button>
      </div>
      <div className="grid grid-cols-3 gap-5 px-[24px]">
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
