export const AUTH_TOKEN_KEY = "authToken";
export const AUTH_USER_ID_KEY = "authUserId";

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

export function getAuthUserId() {
  return localStorage.getItem(AUTH_USER_ID_KEY);
}

export function setAuthUserId(userId) {
  if (userId) {
    localStorage.setItem(AUTH_USER_ID_KEY, String(userId));
  }
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_ID_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}
