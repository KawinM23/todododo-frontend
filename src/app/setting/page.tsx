import { TextField } from "@mui/material";

export default function page() {
  return (
    <main className="center-container flex-col h-[80vh]">
      <div>Account </div>
      Setting
      <div>
        Webhook Token <TextField></TextField>
      </div>
      Save
    </main>
  );
}
