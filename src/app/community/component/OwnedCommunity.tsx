"use client";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  IconButtonProps,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CommunityApi } from "@/libs/interface/community";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  createInviteCode,
  deleteCommu,
  deleteInviteCode,
  getInviteCode,
} from "@/libs/api/community";

export default function OwnedCommunity({
  myCommunities,
}: {
  myCommunities: CommunityApi[];
}) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {myCommunities.length > 0 ? (
        myCommunities.map((community: CommunityApi) => (
          <CommunityCard key={community.id} community={community} />
        ))
      ) : (
        <Typography>Not owned any community</Typography>
      )}
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
  const { data: session } = useSession();
  const router = useRouter();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("Deleted Community!");
  const [inviteCode, setInviteCode] = React.useState<string>();
  useEffect(() => {
    async function fetchData() {
      if (session) {
        const res = await getInviteCode(session.user.accessToken, community.id);
        if (res.length >= 1) {
          setInviteCode(res[0].id);
        } else {
          setInviteCode("no");
        }
      }
    }
    if (community.is_private) {
      fetchData();
    }
  }, [session]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const deletingCommu = async (id: string) => {
    const res = await deleteCommu(session?.user.accessToken, id);

    if (res?.ok) {
      setSnackOpen(true);

      router.refresh();
    }
  };

  const generateInviteCode = async () => {
    const res = await createInviteCode(session?.user.accessToken, community.id);
    console.log(res);
    if (res) {
      setSnackOpen(true);
      setSuccessText("Generated Invite Code!");

      router.refresh();
    }
  };

  const deletedInviteCode = async () => {
    const res = await deleteInviteCode(
      session?.user.accessToken,
      community.id,
      inviteCode
    );

    if (res) {
      setSnackOpen(true);
      setSuccessText("Deleted Invite Code!");

      router.refresh();
    }
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
          <Button
            onClick={() => {
              deletingCommu(community.id);
            }}>
            Delete
          </Button>
          {community.is_private ? (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          ) : (
            <></>
          )}
        </CardActions>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {inviteCode === "no" ? (
            <Button
              onClick={generateInviteCode}
              className="text-xs"
              variant="outlined">
              Generate Invite Code
            </Button>
          ) : (
            <>
              <Typography>Invite Code: {inviteCode}</Typography>
              <Button
                onClick={deletedInviteCode}
                className="text-xs"
                variant="outlined"
                color="error">
                Delete Invite Code
              </Button>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
