"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const MOCK_ADDRESSES = [
  { id: "1", name: "Home", line1: "123 Fashion Street", city: "Mumbai", state: "Maharashtra", pin: "400001", isDefault: true },
];

export default function AddressesPage() {
  const [addresses] = useState(MOCK_ADDRESSES);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <Button variant="outline" onClick={() => setShowForm(!showForm)}>Add Address</Button>
      </div>

      {showForm && (
        <div className="p-4 border rounded-lg space-y-3">
          <div><Label>Address Line</Label><Input placeholder="Street address" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>City</Label><Input /></div>
            <div><Label>PIN Code</Label><Input /></div>
          </div>
          <Button onClick={() => { toast.success("Address saved (mock)"); setShowForm(false); }}>Save</Button>
        </div>
      )}

      {addresses.map((addr) => (
        <div key={addr.id} className="p-4 border rounded-lg">
          <div className="flex justify-between">
            <p className="font-medium">{addr.name} {addr.isDefault && <span className="text-xs text-primary">(Default)</span>}</p>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Edit address (mock)")}>Edit</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{addr.line1}, {addr.city}, {addr.state} {addr.pin}</p>
        </div>
      ))}
    </div>
  );
}
