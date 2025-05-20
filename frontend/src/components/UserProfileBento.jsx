import React from "react";

export default function UserProfileBento({
  editable,
  handleChange,
  handleUpdate,
  setEditable,
  formData,
  points,
  maxPoints,
  progress,
}) {
  const fields = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "username", label: "Username" },
    { key: "phone", label: "Phone" },
    { key: "dob", label: "Date of Birth" },
  ];

  return (
    <div className="w-full min-h-screen bg-white p-10 font-sans space-y-8">
      {/* Horizontal User Info Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">{formData.fullName}</h2>
          {editable ? (
            <button
              onClick={handleUpdate}
              className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditable(true)}
              className="text-sm px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition"
            >
              Edit
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fields.map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <div className="text-sm font-medium text-gray-500">{label}</div>
              {editable ? (
                <input
                  type={
                    key === "dob" ? "date" : key === "email" ? "email" : "text"
                  }
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-base text-black outline-none focus:ring-2 focus:ring-green-400"
                />
              ) : (
                <div className="text-lg font-semibold text-gray-800">
                  {formData[key] || "—"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reward + Thanks Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reward Points */}
        <div className="relative h-[22rem] rounded-2xl bg-gradient-to-br from-green-100 to-green-200 p-3 text-gray-800 shadow-xl transition-transform duration-500 hover:scale-[1.02]">
          <div className="absolute top-4 left-4 text-xs text-gray-500">
            Reward points
          </div>
          <div className="absolute top-4 right-4 text-xs rounded-full bg-white/70 px-3 py-1 text-gray-600 shadow">
            UNIK 👟
          </div>
          <div className="flex h-full items-center justify-center relative z-10">
            <span className="text-[6rem] font-extrabold text-[#006d45] drop-shadow-sm">
              {points}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-2 rounded-full bg-white/50">
              <div
                className="h-2 rounded-full bg-green-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-right text-xs text-gray-600">
              {points}/{maxPoints} pts
            </div>
          </div>
        </div>

        {/* Fun Thanks Card */}
        <div className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 p-6 rounded-2xl shadow-md hover:scale-[1.02] transition">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-pink-700">Thank You! 🎉</h2>
            <p className="text-sm text-gray-700">
              We appreciate your shopping with us. Stay stylish!
            </p>
            <button className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
