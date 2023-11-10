export async function register({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE + "/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );
    if (res.ok) {
      return "Success";
    } else {
      return "Error";
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function userLogIn(email: string, password: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE + "/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      }
    );
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    console.error("Error ", e);
    throw new Error("Failed to login.");
  }
}
