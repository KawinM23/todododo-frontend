import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-3">
      <TextField id="email" name="email" label="Email" variant="standard" />
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="standard"
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="standard"
      />
      <Button>Register</Button>
    </form>
  );
}
