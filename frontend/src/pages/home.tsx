import { useContext, useEffect } from "react";
import { Card } from "../components/card";
import { TransactionContext } from "../context/transaction";

function HomePage() {
  const state = useContext(TransactionContext);

  console.log("transactions", state?.transactions);

  useEffect(() => {
    state?.addNewTransaction({
      id: 123,
      name: "bbb",
      price: 123,
      qty: 123,
    });
  }, []);

  const data = {
    image:
      "https://images.pexels.com/photos/22882440/pexels-photo-22882440/free-photo-of-copa-cozinha-04.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    name: "Rumah impian",
    quote: "Ini rumah impian saya",
  };

  return (
    <>
      <Card image={data.image} name={data.name} quote={data.quote} />
      {JSON.stringify(state?.transactions)}
    </>
  );
}

export default HomePage;
