const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
