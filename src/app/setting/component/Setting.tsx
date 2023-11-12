"use client";
import { setWebhookAPI } from "@/libs/api/notification";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Setting({
  myWebhook,
}: {
  myWebhook: string | null | undefined;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [webhook, setWebhook] = useState(
    myWebhook?.substring(1, myWebhook.length - 1) ?? ""
  );

  const onWebhookSave = () => {
    setWebhookAPI(session?.user.sub, webhook);
    router.refresh();
  };

  return (
    <Paper className="w-[700px] text-left p-4">
      <Typography variant="h5">Setting</Typography>
      <div className="">
        Webhook URL
        <TextField
          sx={{ height: "0.2rem", width: 400 }}
          size="small"
          id="webhook"
          name="webhook"
          className="ml-3"
          onChange={(e) => {
            setWebhook(e.target.value);
          }}
          value={webhook}
          placeholder="Put Your Discord Webhook Here!"
        />
        <Button variant="outlined" className="ml-3" onClick={onWebhookSave}>
          Save
        </Button>
      </div>
    </Paper>
  );
}
