import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorations */}
      <div className="bubble w-16 h-16" style={{ left: "10%", animationDelay: "0s" }} />
      <div className="bubble w-20 h-20" style={{ left: "80%", animationDuration: "12s" }} />
      <div className="absolute top-8 left-8 text-[#ffd700] text-4xl animate-float-slow select-none drop-shadow-[0_4px_0_#b8860b]">
        ★
      </div>
      <div className="absolute bottom-16 right-12 text-[#ffd700] text-3xl animate-float-fast select-none drop-shadow-[0_4px_0_#b8860b]">
        ★
      </div>
      <div className="absolute top-1/4 right-8 text-pink-400 text-3xl animate-float select-none">❤</div>
      <div className="absolute bottom-1/4 left-12 text-pink-300 text-2xl animate-float-slow select-none" style={{ animationDelay: "2s" }}>❤</div>

      <div className="relative z-10 w-full max-w-md">
        <div className="retro-window-static">
          <div className="window-header">
            <span>Admin_Login.exe</span>
            <div className="flex gap-1">
              <span className="window-controls"><span className="bg-gray-200" /></span>
              <span className="window-controls"><span className="bg-gray-200" /></span>
              <span className="window-controls"><span className="bg-red-400" /></span>
            </div>
          </div>
          <div className="window-menu">
            <span>File</span><span>Help</span>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🔐</div>
              <h1 className="font-display font-bold text-2xl text-[#1e5b85]">Admin Panel</h1>
              <p className="text-sm text-[#6dbcdb] font-bold mt-1">Masuk ke dashboard admin</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
