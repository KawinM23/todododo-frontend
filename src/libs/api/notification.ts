export async function setWebhookAPI(
  user_id: string | undefined,
  webhook: string
) {
  if (!user_id) {
    return;
  }
  if (webhook == "") {
    const res = await fetch(
      process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_API_ROUTE +
        "/webhook/" +
        user_id,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhook),
      }
    );
    if (res.ok) {
      return res;
    } else {
      return "Error";
    }
  }
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_API_ROUTE +
        "/webhook/" +
        user_id,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhook),
      }
    );
    if (res.ok) {
      return res;
    } else {
      return "Error";
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getMyWebhook(user_id: string | null | undefined) {
  if (!user_id) {
    return null;
  }
  try {
    const res = await fetch(
      process.env.NOTIFICATION_SERVICE_API_ROUTE + "/webhook/" + user_id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      return res.text();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}
