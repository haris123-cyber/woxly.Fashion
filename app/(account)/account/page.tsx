import { redirect } from "next/navigation";

export default function AccountDashboard() {
  redirect("/account/orders");
}
