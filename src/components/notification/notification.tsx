import React, { useState, useEffect } from "react";

const Notification = ({ message, status }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 2000; // Duração da notificação em milissegundos
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress - (100 / duration) * 10);
    }, 10);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  let bgColor;
  let textColor;

  if (status === "success") {
    bgColor = "bg-green-500";
    textColor = "text-white";
  } else if (status === "error") {
    bgColor = "bg-red-500";
    textColor = "text-white";
  }

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 p-4 rounded-md ${bgColor} ${textColor}`}
      >
        <div className="flex gap-1">
          <div>
            {status === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            )}
          </div>
          <p>{message}</p>
        </div>

        <div className="w-full h-1 rounded-full relative mt-2">
          <div
            className={`absolute top-0 left-0 h-1 bg-white rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Notification;
