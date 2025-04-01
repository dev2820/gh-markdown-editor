// app/routes/auth/github.tsx
import { useNavigate } from 'react-router';

export default function login() {
  const navigate = useNavigate();
  const handleGithubLogin = () => {
    navigate('/login/github');
  };
  return (
    <>
      <h1>Login</h1>
      <button onClick={handleGithubLogin}>github</button>
    </>
  );
}
