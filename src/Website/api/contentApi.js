const DEFAULT_BASE_URL = "http://localhost:8080";

export function getApiBaseUrl() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL;
  return baseUrl.replace(/\/+$/, "");
}

export async function fetchAllContent({ signal } = {}) {
  const response = await fetch(`${getApiBaseUrl()}/api/content`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load content: ${response.status}`);
  }
  const json = await response.json();
  if (!json?.success) {
    throw new Error(json?.message || "Failed to load content");
  }
  return json.data;
}
