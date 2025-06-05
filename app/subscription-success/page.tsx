"use client";
import { Suspense } from "react";
import SubscriptionSuccess from "@/components/subscription-success";

export const dynamic = "force-dynamic";

export default function SubscriptionSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubscriptionSuccess />
        </Suspense>
    );
}
