import { useState, useEffect } from "react";

export default function Toast() {
  const [toast, setToast] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    window.showToast = (message, type = "success") => {
      setToast({ message, type, show: true });

      setTimeout(() => {
        setToast({ message: "", type: "", show: false });
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