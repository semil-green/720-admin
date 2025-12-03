"use client";
import { useEffect } from "react";
import { messaging, getToken } from "@/lib/firebaseConfig";
import { sendFcmService } from "@/service/fcm/fcm.service";
import { toast } from "sonner";

export default function FCMSetup() {
    useEffect(() => {
        async function registerFCM() {
            if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

            try {
                const permission = await Notification.requestPermission();
                // if (permission !== "granted") {
                //     toast.error("Notification permission denied ❌");
                //     return;
                // }

                const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

                const token = await getToken(messaging, {
                    vapidKey: "BPdu-6DeIO6EufXBfGbY5BZx5YAaI9igSfbt4vpv1sxJ5y8gs602_sz7UQ2vJ_srluKosWe2fS0-OPv042M7iVA",
                    serviceWorkerRegistration: registration,
                });

                if (token) {

                    const saveToken = await sendFcmService(token);

                }
            } catch (err) {
                toast.error("Failed to initialize notifications ");
            }
        }

        registerFCM();
    }, []);

    return null;
}
