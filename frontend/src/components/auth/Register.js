import AuthForm from '../common/AuthForm';

export default function Register({
  backend,
  setLoggedIn,
  setIsRegisterSuccess,
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="Register box">
        <h2 className="mb-3">
          Creating a new account
        </h2>
        <AuthForm
          setIsRegisterSuccess={setIsRegisterSuccess}
          backend={backend}
          type="register"
          setLoggedIn={setLoggedIn}
        />
      </div>
    </div>
  );
};
