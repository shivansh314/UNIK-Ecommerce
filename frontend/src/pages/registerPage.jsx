import React from "react";
import SignUpComponent from "../components/SignUpComponent";

function AuthPage() {
  return (
    <div
      className="h-screen w-screen flex justify-center items-center relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.prismic.io/ubac/ea5fb6bc-a5e2-4731-bfa6-ec9343a9c4c2_image07503+%283%29+%281%29.jpeg?auto=compress%2Cformat&rect=0%2C455%2C8192%2C4551&w=1640&q=80')",
      }}
    >
      {/* Signup Component in Center */}
      <div className="relative z-1">
        <SignUpComponent />
      </div>
    </div>
  );
}

export default AuthPage;
  