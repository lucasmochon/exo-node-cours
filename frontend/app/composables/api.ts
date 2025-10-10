export const useApi = () => {
  const baseURL = "http://localhost:3000/api";

  async function get(url: string, token?: string) {
    const res = await fetch(`${baseURL}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(`Erreur GET ${url}`);
    return await res.json();
  }

  async function post(url: string, data: any, token?: string) {
    const res = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Erreur POST ${url}`);
    return await res.json();
  }

  async function put(url: string, data: any, token?: string) {
    const res = await fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Erreur PUT ${url}`);
    return await res.json();
  }

  async function del(url: string, token?: string) {
    const res = await fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(`Erreur DELETE ${url}`);
    return await res.json();
  }

  return { get, post, put, del };
};
