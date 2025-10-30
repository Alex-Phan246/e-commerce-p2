"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "../../../components/Loading";

const AllProductsClient = dynamic(() => import("./AllProductsClient"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function AllProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AllProductsClient />
    </Suspense>
  );
}
