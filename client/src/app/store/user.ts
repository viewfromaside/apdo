import { User } from "../services/models/user";

export function saveUser(user: User): User {
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function getUser(): User | null {
  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function verifyItsLogged() {
  const user = getUser();
  const jwt = localStorage.getItem("jwt");
  return user?.id && jwt;
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
}
