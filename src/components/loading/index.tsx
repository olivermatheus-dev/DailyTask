"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const LoadingComponent = () => {
  const controls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        opacity: [0, 1, 0],
        transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
      });
    };

    startAnimation();
  }, [controls]);

  const handleExit = async () => {
    await controls.start({ opacity: 0 });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#6D4AB7",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
        initial={{ scaleX: 0, originX: 0.5 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default LoadingComponent;
