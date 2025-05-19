'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useEffect, useState } from "react";

export default function ExecutiveModal({ id, open, onClose }) {
  const [executive, setExecutive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id && open) {
      fetch(`/api/executives/${id}`)
        .then(res => res.json())
        .then(data => {
          setExecutive(data);
          setFormData(data); // Initialize editable fields
          setLoading(false);
        });
    }
  }, [id, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSave = async () => {
  const res = await fetch(`/api/executives/${id}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    onClose(true); // refresh UI
  } else {
    console.error("Update failed", await res.json());
  }
};


  const handleDelete = async () => {
    await fetch(`/api/executives/${id}`, { method: 'DELETE' });
    onClose(true); // Refresh
  };

  if (!open || loading) return null;

  const fields = [
    "name", "rank", "uniid", "memid", "society", "photo", "start_date", "remarks", "phone_number",
    "email", "off_mail", "linkedin_url", "github_url", "portfolio_url", "branch",
    "graduation_year", "home_address"
  ];

  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Executive</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          {fields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize">{field.replace(/_/g, " ")}</label>
              {field === "remarks" || field === "home_address" ? (
                <Textarea
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                />
              ) : (
                <Input
                  name={field}
                  type={field === "start_date" ? "date" : "text"}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                />
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="ghost" onClick={() => onClose(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
