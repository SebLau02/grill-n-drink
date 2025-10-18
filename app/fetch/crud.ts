const buildOptions = (method: string, o: Record<string, any> = {}) => {
  const defaultHeaders = { "Content-Type": "application/json" };
  const headers = o.headers || defaultHeaders;
  let body = o.body;
  if (!body && method !== "GET" && o.data) {
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
    const options = buildOptions("PATCH", o);
    const res = await fetch(path, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Erreur lors de la requête PATCH");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const post = async (path: string, o: Record<string, any> = {}) => {
  try {
    const options = buildOptions("POST", o);
    const res = await fetch(path, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Erreur lors de la requête POST");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const get = async (path: string, o: Record<string, any> = {}) => {
  try {
    const options = buildOptions("GET", o);
    const res = await fetch(path, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Erreur lors de la requête GET");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const del = async (path: string, o: Record<string, any> = {}) => {
  try {
    const options = buildOptions("DELETE", o);
    const res = await fetch(path, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Erreur lors de la requête DELETE");
    }
    return data;
  } catch (error) {
    return error;
  }
};
