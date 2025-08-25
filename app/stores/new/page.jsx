"use client";

import MainLayout from "@/components/layout/mainLayout";
import StoreForm from "@/components/stores/StoreForm";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AvailablePincodes from "@/components/stores/AvailablePincodes";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CreateStorePageContent() {
  const searchParams = useSearchParams();

  const editId = parseInt(searchParams.get("id"));

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Create Store</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StoreForm
              initialData={{}}
              type={"dark_store"}
              editId={editId}
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Available Pincodes</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AvailablePincodes
              editId={editId}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}



export default function CreateStorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateStorePageContent />
    </Suspense>
  );
}