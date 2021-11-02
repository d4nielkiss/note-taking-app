import AuthForm from '../common/AuthForm';

export default function Register({ backend }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="Register box">
        <h2 className="mb-3">
          Creating a new account
        </h2>
        <AuthForm backend={backend} type="register" />
      </div>
    </div>
  );
};
