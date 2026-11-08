
"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function CurrentDate() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return <span>Loading date...</span>;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <span>{today}</span>;
}
