"use client";

import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showCustomToast } from "@/components/shared/CustomToast";
import { User, Lock, Bell, Camera, EyeOff, Check } from "lucide-react";

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("/images/usericon.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        showCustomToast({ title: "Profile photo updated", type: "success" });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">


      {/* Profile Card */}
      <div className="border border-border p-6 sm:p-8 bg-background flex flex-col gap-8">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 text-[#cfae70]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.1em] mb-1">Profile Information</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.05em]">Update your personal details and profile photo.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
          <div className="flex flex-col items-center gap-4 shrink-0 mx-auto md:mx-0">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary border border-border">
                <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:text-[#cfae70] transition-colors shadow-sm"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 border border-border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] hover:border-[#cfae70] hover:text-[#cfae70] transition-colors bg-background"
            >
              <Camera className="w-3 h-3" />
              Change Photo
            </button>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Email Address</Label>
              <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" defaultValue="demo@woxly.store" type="email" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button
            onClick={() => showCustomToast({ title: "Profile updated successfully", type: "success" })}
            className="bg-foreground text-background hover:bg-[#cfae70] transition-colors px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Card */}
      <div className="border border-border p-6 sm:p-8 bg-background flex flex-col gap-8">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 text-[#cfae70]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.1em] mb-1">Change Password</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.05em]">Keep your account secure with a strong password.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 relative">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Current Password</Label>
              <div className="relative">
                <Input className="rounded-none border-border focus-visible:ring-[#cfae70] pr-10" type="password" placeholder="Enter your current password" />
                <EyeOff className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer" />
              </div>
            </div>
            <div className="space-y-2 relative">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">New Password</Label>
              <div className="relative">
                <Input className="rounded-none border-border focus-visible:ring-[#cfae70] pr-10" type="password" placeholder="Enter new password" />
                <EyeOff className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer" />
              </div>
            </div>
            <div className="space-y-2 relative">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Confirm New Password</Label>
              <div className="relative">
                <Input className="rounded-none border-border focus-visible:ring-[#cfae70] pr-10" type="password" placeholder="Confirm new password" />
                <EyeOff className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="bg-secondary p-4 sm:p-6 border border-border flex flex-col gap-3">
            <p className="text-[10px] text-foreground font-bold tracking-[0.1em] uppercase">Your password must contain:</p>
            <div className="flex flex-wrap gap-4 sm:gap-8">
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><Check className="w-3 h-3 text-[#cfae70]" /> At least 8 characters</span>
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><Check className="w-3 h-3 text-[#cfae70]" /> One uppercase letter</span>
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><Check className="w-3 h-3 text-[#cfae70]" /> One number</span>
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground"><Check className="w-3 h-3 text-[#cfae70]" /> One special character</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button
            onClick={() => showCustomToast({ title: "Password updated successfully", type: "success" })}
            className="bg-foreground text-background hover:bg-[#cfae70] transition-colors px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold w-full sm:w-auto"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="border border-border p-6 sm:p-8 bg-background flex flex-col gap-6">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 text-[#cfae70]">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.1em] mb-1">Preferences</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.05em]">Manage your communication preferences.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-1 sm:ml-14">
          <input type="checkbox" id="newsletter" defaultChecked className="w-4 h-4 accent-foreground cursor-pointer" />
          <label htmlFor="newsletter" className="text-xs text-foreground cursor-pointer select-none">
            Receive emails about new arrivals, offers and fashion updates
          </label>
        </div>
      </div>

    </div>
  );
}
