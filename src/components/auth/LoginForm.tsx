"use client";

import { useState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold text-[#1e5b85] mb-1">
          <i className="fas fa-envelope mr-1" /> Email
        </label>
        <input
          type="email"
          name="email"
          className="retro-input"
          placeholder="admin@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-[#1e5b85] mb-1">
          <i className="fas fa-lock mr-1" /> Password
        </label>
        <input
          type="password"
          name="password"
          className="retro-input"
          placeholder="••••••••"
          required
        />
      </div>
      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-red-600 text-sm font-bold">
          ⚠️ {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="retro-btn retro-btn-blue w-full justify-center mt-2 disabled:opacity-60"
      >
        {loading ? (
          <><i className="fas fa-spinner fa-spin" /> Masuk...</>
        ) : (
          <><i className="fas fa-sign-in-alt" /> Login ke Dashboard</>
        )}
      </button>
    </form>
  );
}
