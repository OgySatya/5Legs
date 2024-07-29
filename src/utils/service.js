import useUserStore from "@/stores/user";
import axios from "axios";

export function service(data = {}) {
  const userStore = useUserStore();
  return axios
  .create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${userStore.users.token}`,
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
  });
}
