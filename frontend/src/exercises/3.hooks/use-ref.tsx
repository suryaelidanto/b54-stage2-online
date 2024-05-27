import { useMyForm } from "./custom-hook";

export function MyForm() {
  const { handleSubmit, inputNameRef } = useMyForm();

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input ref={inputNameRef} />

      <button type="submit">Submit</button>
    </form>
  );
}
