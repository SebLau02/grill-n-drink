const buildOptions = (method: string, o: Record<string, any> = {}) => {
  const defaultHeaders = { "Content-Type": "application/json" };
  let headers = o.headers || defaultHeaders;
  let body = o.body;

  // Si body est un FormData, ne pas forcer le Content-Type
  if (body instanceof FormData) {
    // On retire le Content-Type pour laisser le navigateur le gérer
    const { ["Content-Type"]: _, ...restHeaders } = headers;
    headers = restHeaders;
  } else if (
    body &&
    headers["Content-Type"] === "application/json" &&
    typeof body === "object"
  ) {
    body = JSON.stringify(body);
  } else if (!body && method !== "GET" && o.data) {
    body =
      headers["Content-Type"] === "application/json"
        ? JSON.stringify(o.data)
        : o.data;
  }

  return {
    method,
    headers,
    body,
    ...o,
  };
};

export const patch = async (path: string, o: Record<string, any> = {}) => {
  try {
    const res = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...(o.headers && o.headers),
      },
      body: JSON.stringify(o.body),
      method: "PATCH",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    } else return data;
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
};

export const post = async (path: string, o: Record<string, any> = {}) => {
  try {
    const res = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...(o.headers && o.headers),
      },
      body: JSON.stringify(o.body),
      method: "POST",
    });
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    } else return data;
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
};

export const get = async (path: string, o: Record<string, any> = {}) => {
  try {
    const options = buildOptions("GET", o);
    const res = await fetch(path, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    } else return data;
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
};

export const del = async (path: string, o: Record<string, any> = {}) => {
  try {
    const options = buildOptions("DELETE", o);
    const res = await fetch(path, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    } else return data;
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
};
