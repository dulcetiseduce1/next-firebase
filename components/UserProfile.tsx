
export default function UserProfile({ user }: { user: any }) {
  return (
    <div className="box-center">
      <img src={user.photoURL || '/hacker.png'}className="card-img-center" />
      <p>
        <h1>@{user.username || 'Anonymous User'}</h1>
      </p>
    </div>
  );
}