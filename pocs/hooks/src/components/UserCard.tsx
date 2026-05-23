import useUser from '../hooks/useUser';

function UserCard({ userId }: { userId: number }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <p>carregando...</p>;
  if (error)   return <p>erro: {error.message}</p>;
  return <p>{user?.name} — {user?.email}</p>;
}

export default UserCard;