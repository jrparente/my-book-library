import React, { useState } from "react";
import supabase from "@/lib/supabaseClient";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      alert(error.message);
    } else {
      alert("Password reset link sent to email.");
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};

export default PasswordResetPage;
