import { useState, useEffect } from "react";

type ToastType = "success" | "error";

type ToastState = {
  message: string;
  type: ToastType;
  show: boolean;
};

declare global {
  interface Window {
    showToast: (message: string, type?: ToastType) => void;
  }
}

export default function Toast() {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    show: false,
  });

  useEffect(() => {
    window.showToast = (message: string, type: ToastType = "success") => {
      setToast({
        message,
        type,
        show: true,
      });

      setTimeout(() => {
        setToast({
          message: "",
          type: "success",
          show: false,
        });
      }, 3000);
    };
  }, []);

  if (!toast.show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 18px",
        borderRadius: "8px",
        color: "white",
        background: toast.type === "success" ? "green" : "red",
        zIndex: 9999,
      }}
    >
      {toast.message}
    </div>
  );
}