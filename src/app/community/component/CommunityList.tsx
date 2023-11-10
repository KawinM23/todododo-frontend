"use client";

import {
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
  TextField,
  Typography,
} from "@mui/material";

import { Fragment, useState } from "react";

export default function CommunityList() {
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
