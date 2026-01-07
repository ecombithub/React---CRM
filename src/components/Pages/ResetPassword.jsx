import { useState } from "react";
import { useParams } from "wouter";
import { useResetPassword } from "../Use-auth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useResetPassword();

  const query = new URLSearchParams(window.location.search);
  const emailFromLink = query.get("email");

  const submit = () => {
    if (!password) return alert("Please enter a new password");

    mutate(
      { token, password },
      {
        onSuccess: () => {
          alert("Password updated successfully!");
          window.location.href = "/login";
        },
        onError: (err) => alert(err.message),
      }
    );
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
      {emailFromLink && (
        <p className="text-sm text-gray-700">
          <span className="font-medium">Email:</span> {emailFromLink}
        </p>
      )}

      <h2 className="text-xl font-semibold text-gray-800">New Password</h2>

      <Input
        type="password"
        className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        onClick={submit}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200`}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          "Update Password"
        )}
      </Button>
    </div>
  );
}