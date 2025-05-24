"use client";
import React, { useState } from "react";
import { useSerial } from "@/context/SerialContext";

export default function Debug() {
  const { output, connectSerial } = useSerial();

  return (
    <div style={{ fontFamily: "monospace", padding: "1rem" }}>
      <button
        onClick={connectSerial}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Connect to Arduino
      </button>

      <pre
        style={{
          marginTop: "1rem",
          background: "#f0f0f0",
          color: "black",
          padding: "1rem",
          borderRadius: "4px",
        }}
      >
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </pre>
    </div>
  );
}
