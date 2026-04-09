import Image from "next/image";

export default function Dado({ valor }) {
  return (
    <div style={{ width: 150 }}>
      <Image
        src={`/dado-${valor}.png`}
        alt={`Dado ${valor}`}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}