"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Hata oluştu!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Tekrar dene
      </button>
    </div>
  );
}
