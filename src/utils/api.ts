//src/utils/api.ts
export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<any> => {
  const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";

  try {
    const response = await fetch(`${baseUri}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${error}`);
    throw error;
  }
};
