import { Card } from "../components/card";

function HomePage() {
  const data = {
    image:
      "https://images.pexels.com/photos/22882440/pexels-photo-22882440/free-photo-of-copa-cozinha-04.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    name: "Rumah impian",
    quote: "Ini rumah impian saya",
  };

  return (
    <>
      <Card image={data.image} name={data.name} quote={data.quote} />
    </>
  );
}

export default HomePage;
