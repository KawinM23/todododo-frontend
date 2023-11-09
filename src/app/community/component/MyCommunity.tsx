"use client";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import OwnedCommunity from "./OwnedCommunity";
import JoinedCommunity from "./JoinedCommunity";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CommunityList() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className="mb-5">
      <div className="flex flex-row items-baseline justify-between">
        <Typography variant="h5" className="">
          My Communities
        </Typography>
        <Button variant="outlined">Create Community</Button>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Joined Communities" />
            <Tab label="Owned Communities" />
          </Tabs>
        </Box>

        <CustomTabPanel value={tab} index={0}>
          <JoinedCommunity />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <OwnedCommunity />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
