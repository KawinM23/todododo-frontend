"use client";

import { joiningCommu } from "@/libs/api/community";
import { CommunityApi } from "@/libs/interface/community";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

import { Fragment, useState } from "react";

export default function CommunityList({
  publicCommu,
}: {
  publicCommu: CommunityApi[];
}) {
  const [openJoinCommunity, setOpenJoinCommunity] = useState(false);
  return (
    <div className="mb-5">
      <div className="mb-5 flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          Discover Communities!
        </Typography>
        <Button variant="outlined" onClick={() => setOpenJoinCommunity(true)}>
          Join with Code
        </Button>
        <JoinCommunity openState={[openJoinCommunity, setOpenJoinCommunity]} />
      </div>
      <div className="grid grid-cols-3 gap-5 px-[24px]">
        {publicCommu.map((community: CommunityApi) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}

function CommunityCard({ community }: { community: CommunityApi }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("Joined Community!");
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  const joinCommu = async (id: string) => {
    const res = await joiningCommu(session?.user.accessToken, id);
    console.log(res);
    if (res?.ok) {
      setSnackOpen(true);

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
        <CardActions>
          <Button onClick={() => joinCommu(community.id)} size="small">
            Join
          </Button>
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
    </Card>
  );
}

function JoinCommunity({
  openState: [open, setOpen],
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const [communityCode, setCommunityCode] = useState<String>();
  const onChange = (e: any) => {
    setCommunityCode(e.target.value);
  };

  const onSubmit = async () => {
    console.log(communityCode);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
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
          className="rounded-xl">
          <form action={onSubmit} className="flex flex-col gap-4">
            <Typography variant="h6" className="mb-2">
              Add Community
            </Typography>
            <TextField
              id="title"
              name="title"
              label="Community Code"
              onChange={onChange}
              value={communityCode ? null : communityCode}
              fullWidth
              sx={{ display: "block" }}
            />

            <Button type="submit">Add Community</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
