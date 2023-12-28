"use client";
import { useFormStatus } from "react-dom";

export function Button({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button {...props} disabled={pending}>
      {!pending ? children : <p>...</p>}
    </button>
  );
}
