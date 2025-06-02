"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const channel = new BroadcastChannel("serial-data");
const SerialContext = createContext(null);

export function SerialProvider({ children }) {
  const [output, setOutput] = useState([]);
  const [port, setPort] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // ⏱️ Load startTime from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("serial-start-time");
    if (stored) {
      setStartTime(Number(stored));
    }
  }, []);
  console.log(output);
  console.log(startTime);

  const connectSerial = async () => {
    try {
      const newPort = await navigator.serial.requestPort();
      await newPort.open({ baudRate: 115200 });
      setPort(newPort);

      const now = Date.now();
      setStartTime(now);
      localStorage.setItem("serial-start-time", now); // 🧠 persist to localStorage
      channel.postMessage({ type: "startTime", value: now }); // also broadcast it
      console.log("Connected to Arduino");

      const decoder = new TextDecoderStream();
      newPort.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          buffer += value;

          let lines = buffer.split("\n");

          // keep last partial line in buffer
          buffer = lines.pop();

          for (let line of lines) {
            const trimmed = line.trim();
            setOutput((prev) => [...prev, trimmed]);
            channel.postMessage({ type: "serial-data", data: trimmed });
          }
        }
      }
    } catch (err) {
      console.error("Serial connection error:", err);
    }
  };

  // 🧲 Listen to broadcasts from other tabs
  useEffect(() => {
    const handleMessage = (event) => {
      const msg = event.data;

      if (typeof msg === "string") {
        setOutput((prev) => [...prev, msg]);
        return;
      }

      if (msg.type === "serial-data" && msg.data) {
        setOutput((prev) => [...prev, msg.data]);
      }

      if (msg.type === "startTime" && !startTime) {
        setStartTime(msg.value);
        localStorage.setItem("serial-start-time", msg.value); // sync just in case
      }
    };

    channel.addEventListener("message", handleMessage);
    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [startTime]);

  return (
    <SerialContext.Provider
      value={{
        output,
        port,
        startTime,
        connectSerial,
      }}
    >
      {children}
    </SerialContext.Provider>
  );
}

export function useSerial() {
  const context = useContext(SerialContext);
  if (!context) {
    throw new Error("useSerial must be used within a SerialProvider");
  }
  return context;
}
