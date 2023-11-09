"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import { Fragment, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function OwnedCommunity() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <CommunityCard />
    </div>
  );
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CommunityCard() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <CardActions disableSpacing>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Fragment>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Code</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
