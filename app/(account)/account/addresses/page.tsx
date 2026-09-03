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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-6 gap-4">
        <div>
          <h2 className="font-fraunces text-2xl font-normal text-foreground mb-2">Saved Addresses</h2>
          <p className="text-muted-foreground text-[11px] uppercase tracking-[0.1em]">Manage your shipping addresses.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center border border-border bg-transparent text-foreground hover:border-[#cfae70] hover:text-[#cfae70] transition-colors px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          {showForm ? 'Cancel' : 'Add Address'}
        </button>
      </div>

      {showForm && (
        <div className="p-6 border border-border bg-muted/30 space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Address Line</Label>
            <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" placeholder="Street address" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">City</Label>
              <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">PIN Code</Label>
              <Input className="rounded-none border-border focus-visible:ring-[#cfae70]" />
            </div>
          </div>
          <button 
            onClick={() => { toast.success("Address saved (mock)"); setShowForm(false); }}
            className="mt-4 inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            Save Address
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="p-6 border border-border bg-background flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-[#cfae70] transition-colors">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-foreground mb-2 flex items-center gap-2">
                {addr.name} 
                {addr.isDefault && <span className="px-2 py-0.5 bg-[#cfae70]/10 text-[#cfae70] text-[8px] tracking-[0.2em]">DEFAULT</span>}
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{addr.line1}<br/>{addr.city}, {addr.state} {addr.pin}</p>
            </div>
            <button 
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-[#cfae70] transition-colors underline underline-offset-4"
              onClick={() => toast.info("Edit address (mock)")}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
