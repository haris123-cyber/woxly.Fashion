import { AccountNav } from "@/components/account/AccountNav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-fraunces font-normal mb-12 text-center md:text-left text-foreground">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <AccountNav />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
