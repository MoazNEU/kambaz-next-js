/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";
import { FormControl, Button, Alert } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    setErrorMessage(null);
    const result = await client.signin(credentials);
    if (!result.user) {
      setErrorMessage(result.message);
      return;
    }
    dispatch(setCurrentUser(result.user));
    router.push("/dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {errorMessage && (
        <Alert variant="danger" className="mb-2">
          {errorMessage}
        </Alert>
      )}
      <FormControl
        value={credentials.username ?? ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      <br />
      <FormControl
        value={credentials.password ?? ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <br />
      <Button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100 mb-2">
        Sign in{" "}
      </Button>
      <br />
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
