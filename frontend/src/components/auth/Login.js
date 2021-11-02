import AuthForm from '../common/AuthForm';

export default function Login({ backend }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="Login box">
        <h2 className="mb-3">
          Logging in to your account
        </h2>
        <AuthForm backend={backend} type="login" />
      </div>
    </div>
  );
};
