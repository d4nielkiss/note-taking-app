import AuthForm from '../common/AuthForm';

export default function Login() {
  return (
    <div className="d-flex justify-content-center">
      <div className="Login">
        <h2 className="mb-3">
          Logging in to your account
        </h2>
        <AuthForm type="login" />
      </div>
    </div>
  );
};
