"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
const countries = ["Coming Soon :)"];

export function TempLogin() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleClick = () => setOpen((v) => !v);

  return (
    <div ref={popoverRef} className="relative inline-block">
      <Button variant="ghost" size="icon" onClick={handleClick} className="cursor-pointer">
        <User />
      </Button>

      {open && (
        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-38 bg-popover text-popover-foreground border border-border rounded shadow-lg z-50 p-2">
          <ul>
            {countries.map((country) => (
              <li key={country}>
                <button
                  type="button"
                  className="w-full text-left px-2 py-1 rounded hover:bg-accent cursor-pointer"
                  onClick={() => {
                    // handle country select here
                    setOpen(false);
                  }}
                >
                  {country}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
