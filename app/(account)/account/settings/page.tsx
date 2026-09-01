"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 max-w-md">
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>First Name</Label><Input defaultValue="Demo" /></div>
            <div><Label>Last Name</Label><Input defaultValue="User" /></div>
          </div>
          <div><Label>Email</Label><Input defaultValue="demo@woxly.store" type="email" /></div>
          <Button onClick={() => toast.success("Profile updated (mock)")}>Save Profile</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div>
          <Label>Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Password</h2>
        <div className="space-y-3">
          <div><Label>Current Password</Label><Input type="password" /></div>
          <div><Label>New Password</Label><Input type="password" /></div>
          <Button variant="outline" onClick={() => toast.success("Password updated (mock)")}>Update Password</Button>
        </div>
      </div>
    </div>
  );
}
