"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  return (
    <div
      data-testid="notification"
      role="status"
      className={`rounded px-4 py-3 mb-4 text-white font-medium ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
