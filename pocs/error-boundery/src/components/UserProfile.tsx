import { useEffect, useState } from "react";

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<{ name: string} | null>(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return <p>{user.name}</p>;
}

export default UserProfile;