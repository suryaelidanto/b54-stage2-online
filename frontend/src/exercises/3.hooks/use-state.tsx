// useState + conditional rendering
// 1. ternary operator => kondisinya ? kalau benar : kalau salah
// 2. && operator => kondisinya benar && yang ditampilkan
// 3. if else 🔥

import { useState } from "react";

export function ShowCard() {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  return (
    <>
      {isShowed ? (
        <>
          <div
            style={{
              border: "2px solid black",
              width: "200px",
              height: "100px",
            }}
          >
            Card
          </div>
          <button onClick={() => {
            setIsShowed(false)
          }}>Hilangkan kartu</button>
        </>
      ) : (
        <>
          <button onClick={() => {
            setIsShowed(true)
          }}>Munculkan kartu</button>
        </>
      )}
    </>
  );
}
