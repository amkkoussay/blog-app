"use client";

import { useActionState } from "react";
import { registerUser, type RegisterFormState } from "../actions/users";

const initialState: RegisterFormState = { error: "" };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.username && (
            <p data-testid="username-error" className="text-red-600 text-sm mt-1">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.password && (
            <p data-testid="password-error" className="text-red-600 text-sm mt-1">
              {state.errors.password}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="text-red-600 text-sm mt-1"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
}
