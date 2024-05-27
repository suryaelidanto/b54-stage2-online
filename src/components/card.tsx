interface CardProps {
  name: string;
  image: string;
  quote: string;
}

export function Card({ name, image, quote }: CardProps) {
  return (
    <div style={{
      backgroundColor: "black"
    }}>
      <div>
        <img
        style={{
          width: "200px",
          borderRadius: "10px"
        }} 
        src={image} 
        alt="card image" 
        />
      </div>
      <div>
        <p style={{
          fontWeight: "bold",
          color: "white"
        }}>{name}</p>
        <p style={{
          color: "white"
        }}>{quote}</p>
      </div>
    </div>
  );
}
