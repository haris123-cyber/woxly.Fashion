import { AccountNav } from "@/components/account/AccountNav";
import { MobileBackButton } from "@/components/account/MobileBackButton";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-fraunces font-normal -mt-8 mb-6 md:mb-12 text-center md:text-left text-foreground">My Account</h1>
      <MobileBackButton />
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <AccountNav />
        <div className="flex-1 min-w-0 border border-gray-100 ">{children}</div>
      </div>
    </div>
  );
}
