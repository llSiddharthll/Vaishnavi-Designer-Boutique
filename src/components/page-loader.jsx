"use client";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 overflow-hidden">
        <div className="loader-progress h-full bg-gradient-to-r from-pink-600 to-purple-600" />
      </div>

      {/* Center spinner with backdrop blur */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="loader-backdrop" />
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="loader-ring" />
          <div className="loader-dot" />
        </div>
      </div>
    </div>
  );
}
