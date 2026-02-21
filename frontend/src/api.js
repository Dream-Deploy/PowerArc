const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export async function fetchConsignments() {
  const response = await fetch(`${API_BASE_URL}/consignments`);
  if (!response.ok) {
    throw new Error("Failed to load consignments.");
  }
  return response.json();
}

export async function submitInquiry(payload) {
  const response = await fetch(`${API_BASE_URL}/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Submission failed.");
  }

  return data;
}
