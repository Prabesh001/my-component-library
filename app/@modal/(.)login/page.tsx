import React from "react";

const Login = () => {
  return (
    <dialog
    className="bg-gray-300 text-white w-full h-full flex items-center justify-center">
      {/* Login Form  */}
      <div className="flex flex-col items-center justify-center p-4 ">
        <div className="bg-gray-900 p-4">
          <h2 className="text-2xl">Log In</h2>
          <form className="form w-max ">
            <input
              type="email"
              name="email"
              className="bg-white text-black"
              placeholder="Email"
              required
            />
            <p className="error-msg">Error </p>

            <div className="password-field">
              <div className="eye-field"></div>
              <input
                name="password"
                id="login-password"
                placeholder="Password"
                className="bg-white text-black"
                required
              />
            </div>
            <p className="error-msg">Error </p>

            <button type="submit" className="login-button">
              Loading{" "}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Login;
