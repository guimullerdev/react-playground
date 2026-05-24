import { useState, useEffect } from "react";

function BrokenHooks({ isAdmin }: { isAdmin: boolean }) {
  const [count, setCount] = useState(0);

  if (isAdmin) {
    const [user, setUser] = useState(null);
  }

  useEffect(() => {
    console.log("effect rodou — count:", count);
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>count: {count}</button>;
}

function FixedHooks({ isAdmin }: { isAdmin: boolean }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      console.log("buscou user");
    }
  }, [isAdmin]);

  return <button onClick={() => setCount(c => c + 1)}>count: {count}</button>;
}

function HookOrder() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <button onClick={() => setIsAdmin(a => !a)}>
        isAdmin: {String(isAdmin)}
      </button>
      <BrokenHooks isAdmin={isAdmin} />
      <FixedHooks isAdmin={isAdmin} />
    </div>
  );
}

export default HookOrder;