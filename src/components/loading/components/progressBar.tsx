import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setLoadingProgress(10);
    };

    const handleComplete = () => {
      setLoadingProgress(100);
    };

    const handleRouteChange = (url) => {
      setLoadingProgress(10);

      const handleRouteComplete = () => {
        setLoadingProgress(100);
      };

      router.events.on("routeChangeComplete", handleRouteComplete);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    router.events.on("hashChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      router.events.off("hashChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${loadingProgress}%`,
        height: "3px",
        backgroundColor: "#0070f3",
        transition: "width 0.3s",
        zIndex: 9999,
      }}
    />
  );
};

export default ProgressBar;
