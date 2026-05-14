import { useEffect } from "react";

function BombInEffect() {
  useEffect(() => {
    throw new Error("💣 BombInEffect");
  }, []);

  return <p>componente carregou (BombInEffect)</p>;
}

export default BombInEffect;