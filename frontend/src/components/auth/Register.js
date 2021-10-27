import AuthForm from '../common/AuthForm';

export default function Register() {
  return (
    <div className="d-flex justify-content-center">
      <div className="Register box">
        <h2 className="mb-3">
          Creating a new account
        </h2>
        <AuthForm type="register" />
      </div>
    </div>
  );
};
