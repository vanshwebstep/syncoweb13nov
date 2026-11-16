import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ message, type = "success", duration = 4500 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const toast = {
    success: (message, duration = 4500) => addToast({ message, type: "success", duration }),
    error: (message, duration = 4500) => addToast({ message, type: "error", duration }),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToasterContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastItem = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 4500);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const isSuccess = toast.type === "success";

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex w-full max-w-sm sm:max-w-md items-start gap-3 rounded-2xl border bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ${
        isSuccess
          ? "border-[#0DD180]/40 text-[#101014]"
          : "border-red-300 text-[#101014]"
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-[#0DD180]" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500" />
        )}
      </div>

      <div className="flex-1 text-[13px] sm:text-[14px] leading-relaxed font-medium poppins text-[#101014]">
        {toast.message}
      </div>

      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        aria-label="Close notification"
        className="shrink-0 rounded-lg p-1 text-[#8F90A6] hover:bg-gray-100 hover:text-[#101014] transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const ToasterContainer = ({ toasts = [], onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none max-w-[90vw] sm:max-w-md"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
};

export const Toaster = ToasterContainer;

export default Toaster;
