import { notFound } from "next/navigation";
import { getAdminCouponById } from "@/lib/coupons";
import CouponEditForm from "./CouponEditForm";

export default async function AdminCouponEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const couponId = Number(id);
  if (Number.isNaN(couponId) || couponId < 1) notFound();

  const coupon = await getAdminCouponById(couponId);
  if (!coupon) notFound();

  return <CouponEditForm coupon={coupon} />;
}
