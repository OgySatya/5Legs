import { service } from "@/utils/service";

export function getUsers() {
  return service().get("/user");
}
