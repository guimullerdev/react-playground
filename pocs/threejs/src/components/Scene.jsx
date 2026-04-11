import { useRef } from "react";
import { useThree } from "../hooks/useThree";

export default function Scene() {
  const mountRef = useRef(null);
  useThree(mountRef);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}
    />
  );
}