"use client";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import OwnedCommunity from "./OwnedCommunity";
import JoinedCommunity from "./JoinedCommunity";
import { CheckBox } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { createCommu } from "@/libs/api/community";

import React from "react";
import { useRouter } from "next/navigation";
import { CommunityApi } from "@/libs/interface/community";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Community {
  title: string;
  description: string;
  is_private: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CommunityList({
  myCommunities,
  joinedCommunities,
}: {
  myCommunities: CommunityApi[];
  joinedCommunities: CommunityApi[];
}) {
  const [tab, setTab] = useState(0);
  const [openAddCommunity, setAddCommunity] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className="mb-5">
      <div className="flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          My Communities
        </Typography>
        <Button variant="outlined" onClick={() => setAddCommunity(true)}>
          Add Community
        </Button>
        <AddCommunity openState={[openAddCommunity, setAddCommunity]} />
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Joined Communities" />
            <Tab label="Owned Communities" />
          </Tabs>
        </Box>

        <CustomTabPanel value={tab} index={0}>
          <JoinedCommunity communities={joinedCommunities} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <OwnedCommunity myCommunities={myCommunities} />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
function AddCommunity({
  openState: [open, setOpen],
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const { data: session } = useSession();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const router = useRouter();

  const [community, setCommunity] = useState<Community>({
    title: "",
    description: "",
    is_private: false,
  });
  const onChange = (e: any) => {
    if (e.target.name === "is_private") {
      setCommunity({ ...community, [e.target.name]: e.target.checked });
    } else {
      setCommunity({ ...community, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async () => {
    console.log(community);

    try {
      const res = await createCommu({
        ...community,
        token: session?.user.accessToken,
      });
      //console.log("res", res);
      if (res != null) {
        setSuccessText("Add Community Completed!");
        setSnackOpen(true);
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
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

  return (
    <Fragment>
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
                label="Title"
                onChange={onChange}
                value={community.title === "" ? null : community.title}
                fullWidth
                sx={{ display: "block" }}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                onChange={onChange}
                value={
                  community.description === "" ? null : community.description
                }
                fullWidth
                sx={{ display: "block" }}
                multiline
                minRows={2}
              />
              <FormControlLabel
                label="Private"
                control={
                  <Checkbox
                    id="is_private"
                    name="is_private"
                    onChange={onChange}
                  />
                }
              />

              <Button type="submit">Add Community</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successText}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
