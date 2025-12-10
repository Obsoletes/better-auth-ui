import { authClient } from "@/lib/auth-client";
import { Button, Card, Input } from "@mui/material";
import { useEffect, useState } from "react";

export const SignUp = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    authClient.passkey.listUserPasskeys().then(console.log);
  }, []);
  const onClick = () => {
    authClient.passkey
      .addPasskey({
        name: name,
        authenticatorAttachment: "cross-platform",
      })
      .then(console.log);
    authClient.signUp.email({
      email: "",
      password: "",
      name: "",
    });
  };
  return (
    <Card>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Button onClick={onClick}>Test</Button>
    </Card>
  );
};
