import React from 'react'
import LoginComponent from '../components/LoginComponent';

function LoginPage() {
  return (
    <div
      className="h-screen w-screen flex justify-center items-center relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.prismic.io/ubac/ea5fb6bc-a5e2-4731-bfa6-ec9343a9c4c2_image07503+%283%29+%281%29.jpeg?auto=compress%2Cformat&rect=0%2C455%2C8192%2C4551&w=1640&q=80')",
      }}
    >
      <div className="relative z-4">
        <LoginComponent />
      </div>
    </div>
  );
}

export default LoginPage
