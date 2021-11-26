import { Link } from 'react-router-dom';
import AuthForm from '../common/AuthForm';

export default function Login({
  backend,
  setLoggedIn,
  setUser,
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="Login box">
        <h2 className="mb-3">
          Logging in to your account
        </h2>
        <AuthForm
          backend={backend}
          type="login"
          setLoggedIn={setLoggedIn}
          setUser={setUser}
        />
        <div className="d-flex justify-content-center mt-5">
          <small>
            Don't have an account yet? <Link to="/register">Click here!</Link>
          </small>
        </div>
      </div>
    </div>
  );
};
