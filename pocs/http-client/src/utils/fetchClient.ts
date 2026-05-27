const config = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token",
  },
};

async function client<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${config.baseUrl}${path}`, {
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  return res.json() as Promise<T>;
}

export default client;