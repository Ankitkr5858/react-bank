const BASE_URI = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI";

export async function parseJsonResponse(response) {
  let json = null;

  try {
    json = await response.json();
  } catch (e) {
    // TODO Do something if response has no, or invalid JSON
  }

  if (response.ok) {
    window.json = json;
    return json;
  }

  const error = new Error(response.statusText);

  error.isFromServer = true;
  error.response = response;
  error.message = json.message;
  error.errors = json.errors;
  error.responseJson = json;

  throw error;
}

export default async (
  path,
  body,
  method = "POST",
  headers = {},
  baseApi = true,
  file = false
) => {
  const uri = baseApi ? `${BASE_URI}` : path;
  const token = localStorage.getItem("jwt");

  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  // eslint-disable-next-line no-param-reassign
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  let fetchProperties = {
    method,
    headers,
  };

  if (body && !file) {
    fetchProperties = { ...fetchProperties, body: JSON.stringify(body) };
  } else if (body && file) {
    fetchProperties = { ...fetchProperties, body: body };
  }

  const response = await fetch(uri, fetchProperties);

  return parseJsonResponse(response);
};
