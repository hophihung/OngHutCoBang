import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Green Joy Admin Dashboard",
  description: "Admin Console - Green Joy",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <AdminSidebar />
      {children}
    </div>
  );
}
