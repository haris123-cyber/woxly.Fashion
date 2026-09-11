import { redirect } from "next/navigation";

export default function AccountDashboard() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full min-h-[400px] text-center text-muted-foreground border-2 border-dashed border-border rounded-[2rem]">
      <h2 className="text-2xl font-fraunces mb-2 text-foreground">Welcome back, Sarah</h2>
      <p className="text-sm">Select an option from the menu to manage your account.</p>
    </div>
  );
}
