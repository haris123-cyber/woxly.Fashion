"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showCustomToast } from "@/components/shared/CustomToast";

export default function SettingsPage() {


  return (
    <div className="space-y-12 max-w-2xl">
      <div className="border-b border-border pb-6">
        <h2 className="font-fraunces text-2xl font-normal text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.1em]">Manage your profile and preferences.</p>
      </div>

      <div className="space-y-6">
        <h3 className="font-fraunces text-lg font-normal text-foreground">Profile</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">First Name</Label>
              <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" defaultValue="Demo" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Last Name</Label>
              <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" defaultValue="User" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Email</Label>
            <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" defaultValue="demo@woxly.store" type="email" />
          </div>
          <button
            onClick={() => showCustomToast({ title: "Profile updated (mock)", type: "success" })}
            className="inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold mt-2"
          >
            Save Profile
          </button>
        </div>
      </div>



      <div className="space-y-6 pt-6 border-t border-border">
        <h3 className="font-fraunces text-lg font-normal text-foreground">Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Current Password</Label>
            <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" type="password" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">New Password</Label>
            <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" type="password" />
          </div>
          <button
            onClick={() => showCustomToast({ title: "Password updated (mock)", type: "success" })}
            className="inline-flex items-center justify-center border border-border bg-transparent text-foreground hover:border-[#cfae70] hover:text-[#cfae70] transition-colors px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold mt-2"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
