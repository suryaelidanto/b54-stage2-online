import React, { useRef } from "react";

export const useMyForm = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputNameRef.current?.value) alert(inputNameRef.current?.value);
  }

  return {
    inputNameRef,
    handleSubmit
  }
};
