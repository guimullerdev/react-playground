import { useEffect } from "react";

function Child({ name }: { name: string }) {
  useEffect(() => {
    console.log("child - mount");

    return () => {
      console.log("child - unmount");
    };
  }, []);

  return <p>olá, {name}</p>;
}

export default Child;