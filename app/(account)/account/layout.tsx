import { AccountNav } from "@/components/account/AccountNav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-fraunces font-bold mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <AccountNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
