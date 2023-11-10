"use client";
import { register } from "@/libs/api/account";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e: any) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      console.log(registerData);
      const res = await register(registerData);
    } catch (error) {}
  };
  return (
    <form className="flex flex-col gap-3" action={onSubmit}>
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="standard"
        onChange={onChange}
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="standard"
        type={"email"}
        onChange={onChange}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="standard"
        onChange={onChange}
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
