export async function getAllPublicCommu() {
  try {
    const res = await fetch(
      process.env.ACCOUNT_SERVICE_API_ROUTE + "/community",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
// prettier-ignore
export async function getAllJoinedCommu(token: string) {
  //console.log(token);
  try {
    const res = await fetch(
      process.env.ACCOUNT_SERVICE_API_ROUTE + "/community/joined",
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
export async function getAllOwnedCommu(token: string) {
  //console.log(token);
  try {
    const res = await fetch(
      process.env.ACCOUNT_SERVICE_API_ROUTE + "/community/owned",
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
export async function joiningCommu(token: any, id: string) {
  console.log(token, id);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE +
        `/community/${id}/member`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function leavingCommu(token: any, id: string) {
  console.log(token, id);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE +
        `/community/${id}/member`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteCommu(token: any, id: string) {
  console.log(token, id);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE + `/community/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function createCommu({
  title,
  description,
  is_private,
  token,
}: {
  title: string;
  description: string;
  is_private: boolean;
  token: any;
}) {
  try {
    console.log(token);
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE + "/community",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: title,
          description: description,
          is_private: is_private,
        }),
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getInviteCode(token: string, id: string) {
  //console.log(token);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE +
        `/community/${id}/invite`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function createInviteCode(token: any, id: string) {
  //console.log(token);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE +
        `/community/${id}/invite`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          expired_in: 99999,
        }),
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function joinWithInviteCode(token: any, code: string) {
  //console.log(token);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_API_ROUTE +
        `/community/invite/${code}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
