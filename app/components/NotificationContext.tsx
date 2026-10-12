"use client";

import { createContext, useContext, useRef, useState } from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (msg: string, notifType: NotificationType = "success") => {
    setMessage(msg);
    setType(notifType);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setMessage(""), 5000);
  };

  return (
    <NotificationContext.Provider value={{ message, type, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
