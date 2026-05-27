const config = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token",
  },
};

async function client<T>(path: string, options?: RequestInit): Promise<T> {
  const modifiedOptions = requestInterceptor(options);
  let response: Response;
  
  try {
    response = await fetch(`${config.baseUrl}${path}`, {
      ...modifiedOptions,
      headers: {
        ...config.headers,
        ...modifiedOptions?.headers,
      },
    });
  } catch (err) {
    throw new Error(`Network error: ${(err as Error).message}`);
  }

  return responseInterceptor<T>(response);
}

function requestInterceptor(options?: RequestInit): RequestInit {
  const token = localStorage.getItem("token");
  return {
    ...options,
    headers: {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
}

async function responseInterceptor<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  return res.json() as Promise<T>;
}

export default client;