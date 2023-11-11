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
import { CommunityApi } from "@/libs/interface/community";

export default function OwnedCommunity({
  myCommunities,
}: {
  myCommunities: CommunityApi[];
}) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {myCommunities.map((community: CommunityApi) => (
        <CommunityCard key={community.id} community={community} />
      ))}
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

function CommunityCard({ community }: { community: CommunityApi }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {community.name}
          </Typography>

          <Typography variant="body2">{community.description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button>Delete</Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
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
