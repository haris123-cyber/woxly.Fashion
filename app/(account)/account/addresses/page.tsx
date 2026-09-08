"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showCustomToast } from "@/components/shared/CustomToast";

const MOCK_ADDRESSES = [
  { id: "1", name: "Home", line1: "123 Fashion Street", city: "Mumbai", state: "Maharashtra", pin: "400001", isDefault: true },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pin: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.line1 || !formData.city || !formData.state || !formData.pin) {
      showCustomToast({ title: "Please fill in all required fields.", type: "error" });
      return;
    }
    
    const newAddress = {
      id: Date.now().toString(),
      name: formData.name, // Or we could use a label like "Work" / "Home", but using name for now
      line1: formData.line1 + (formData.line2 ? `, ${formData.line2}` : ""),
      city: formData.city,
      state: formData.state,
      pin: formData.pin,
      isDefault: addresses.length === 0
    };
    
    setAddresses([...addresses, newAddress]);
    showCustomToast({ title: "Address saved successfully", type: "success" });
    setShowForm(false);
    setFormData({ name: "", phone: "", line1: "", line2: "", city: "", state: "", pin: "" });
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Full Name</Label>
              <Input name="name" value={formData.name} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Phone Number</Label>
              <Input name="phone" value={formData.phone} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Address Line 1</Label>
            <Input name="line1" value={formData.line1} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" placeholder="Flat, House no., Building, Apartment" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">Address Line 2 (Optional)</Label>
            <Input name="line2" value={formData.line2} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" placeholder="Area, Street, Sector, Village" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">City</Label>
              <Input name="city" value={formData.city} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">State</Label>
              <Input name="state" value={formData.state} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.1em] font-bold">PIN Code</Label>
              <Input name="pin" value={formData.pin} onChange={handleInputChange} className="rounded-none border-border focus-visible:ring-[#cfae70]" />
            </div>
          </div>
          <button 
            onClick={handleSave}
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
              onClick={() => showCustomToast({ title: "Edit address (mock)", type: "info" })}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
