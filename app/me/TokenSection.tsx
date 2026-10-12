"use client";

import { useState, useTransition } from "react";
import { generateToken } from "../actions/me";

export default function TokenSection({ token }: { token: string | null }) {
  const [currentToken, setCurrentToken] = useState<string | null>(token);
  const [pending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      const newToken = await generateToken();
      setCurrentToken(newToken);
    });
  };

  return (
    <section data-testid="api-token-section" className="mb-8 border rounded p-4">
      <h2 className="text-xl font-semibold mb-2">API token</h2>
      {currentToken ? (
        <div data-testid="token-display" className="mb-3">
          <p className="text-sm text-gray-600 mb-1">Your personal API token:</p>
          <code
            data-testid="api-token"
            className="block bg-slate-100 rounded px-3 py-2 break-all text-sm"
          >
            {currentToken}
          </code>
        </div>
      ) : (
        <p data-testid="no-token-message" className="text-gray-500 mb-3">
          No token generated yet.
        </p>
      )}
      <button
        data-testid="generate-token-button"
        onClick={handleGenerate}
        disabled={pending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "generating..." : "generate new token"}
      </button>
    </section>
  );
}
