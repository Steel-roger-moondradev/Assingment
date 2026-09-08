const API_URL = import.meta.env.VITE_API_URL;

export async function fetchRecords(filters = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      queryParams.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}/api/data?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }

  return response.json();
}
