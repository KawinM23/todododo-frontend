"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
          <div className="grid grid-cols-3 gap-5">
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <div className="grid grid-cols-3 gap-5">
            <CommunityCard />
          </div>
        </CustomTabPanel>
      </Box>
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
