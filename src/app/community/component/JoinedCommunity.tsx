"use client";
import { joiningCommu, leavingCommu } from "@/libs/api/community";
import { CommunityApi } from "@/libs/interface/community";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Fragment } from "react";

export default function JoinedCommunity({
  communities,
}: {
  communities: CommunityApi[];
}) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {communities.length >= 0 ? (
        communities.map((community: CommunityApi) => (
          <CommunityCard key={community.id} community={community} />
        ))
      ) : (
        <Typography>Not joined any community</Typography>
      )}
    </div>
  );
}

function CommunityCard({ community }: { community: CommunityApi }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("Left Community!");
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  const leaveCommu = async (id: string) => {
    const res = await leavingCommu(session?.user.accessToken, id);
    console.log(res);
    if (res?.ok) {
      setSnackOpen(true);

      router.refresh();
    }
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <div
          className={`rounded-2xl text-xs border-[1px] w-min my-1 py-1 px-2 ${
            community.is_private
              ? "text-sky-600 border-sky-600"
              : "text-green-600 border-green-600"
          }`}
        >
          {community.is_private ? "Private" : "Public"}
        </div>
        <Typography variant="h5" component="div">
          {community.name}
        </Typography>

        <Typography variant="body2">{community.description}</Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button onClick={() => leaveCommu(community.id)} size="small">
          Leave
        </Button>
      </CardActions>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
          {successText}
        </Alert>
      </Snackbar>
    </Card>
  );
}
