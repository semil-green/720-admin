"use client";

import MainLayout from "@/components/layout/mainLayout";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";
import PackagingForm from "@/components/packagingStores/PackagingForm";
import AvailablePincodes from "@/components/packagingStores/AvailablePincodes";

function CreateStorePageContent() {
  const searchParams = useSearchParams();

  const editId = parseInt(searchParams?.get("id"));

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-6">
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Create Packaging Center</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PackagingForm type={"packaging_center"} editId={editId} />
          </CardContent>
        </Card>

        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Available Pincodes</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AvailablePincodes initialData={{}} editId={editId} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

export default function CreateStorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateStorePageContent />
    </Suspense>
  );
}