import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, User, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("amir.khan@visioncapital.com");
  const [password, setPassword] = useState("••••••••••••");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("auth_token", "demo-token-12345");
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_name", "Amir Khan");
      toast.success("Successfully logged in!");
      navigate("/", { replace: true });
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      toast.error("Please accept the Terms of Service.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("auth_token", "demo-token-67890");
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_name", name);
      toast.success(`Welcome to Terravue, ${name}! Your account is active.`);
      navigate("/", { replace: true });
    }, 1800);
  };

  // Demo credentials autofilled by default

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[oklch(0.14_0.02_250)] text-foreground flex">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,oklch(0.62_0.19_250_/_0.15),transparent_70%)]" />

      {/* Left side: Premium Branding Visual (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between p-12 lg:flex border-r border-border/40">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-lighten pointer-events-none" style={{ backgroundImage: "url('/login_bg.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.02_250)] via-[oklch(0.14_0.02_250_/_0.8)] to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-white shadow-lg">
            <Building2 size={20} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight">Terravue</h1>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Real Estate Intelligence</p>
          </div>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] border border-[var(--color-accent)]/20">
              Enterprise Dashboard v2.0
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-tight leading-tight text-white"
          >
            {isRegister ? "Start Your Data-Driven Investment Journey." : "Empowering Leaders with AI-Driven Property Analytics."}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            Access real-time Saudi real estate indexes, competitor radar matrices, cash flow simulators, and advanced geographical demand signals.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 w-fit px-3 py-1.5 rounded-full border border-border/50">
          <ShieldCheck size={14} className="text-[var(--color-emerald)]" />
          <span>Secure AES-256 Encrypted Connection</span>
        </div>
      </div>

      {/* Right side: Login / Register Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-16 lg:w-1/2 lg:flex-none">
        <div className="mx-auto w-full max-w-sm lg:max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            {/* Small Logo for mobile view */}
            <div className="mx-auto lg:mx-0 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-white shadow-lg mb-4 lg:hidden">
              <Building2 size={20} />
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white">
              {isRegister ? "Create Enterprise Account" : "Sign In to Dashboard"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isRegister ? "Get started with analytics and intelligence reports." : "Enter your corporate credentials to access Terravue."}
            </p>
          </div>

          <motion.div
            layout
            className="glass-card p-6 md:p-8 rounded-2xl border border-border/50 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isRegister ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground" htmlFor="email">
                      Corporate Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                        <Mail size={16} />
                      </span>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="name@visioncapital.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-muted-foreground" htmlFor="password">
                        Secure Password
                      </label>
                      <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Contact system administrator to reset."); }} className="text-xs font-medium text-[var(--color-accent)] hover:underline">
                        Forgot?
                      </a>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                        <Lock size={16} />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Authorize Connection <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground">
                      New to Terravue?{" "}
                      <button
                        type="button"
                        onClick={() => setIsRegister(true)}
                        className="font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
                      >
                        Create an Account
                      </button>
                    </p>
                  </div>


                </motion.form>
              ) : (
                <motion.form
                  key="register-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                        <User size={16} />
                      </span>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Amir Khan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground" htmlFor="reg-email">
                      Corporate Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                        <Mail size={16} />
                      </span>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground" htmlFor="company">
                      Company Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                        <Briefcase size={16} />
                      </span>
                      <input
                        id="company"
                        type="text"
                        required
                        placeholder="Vision Capital"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground" htmlFor="reg-pass">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="reg-pass"
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 px-3 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground" htmlFor="confirm-pass">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirm-pass"
                          type="password"
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 px-3 text-sm text-white placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1 text-left">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 h-3.5 w-3.5 rounded border-border bg-background/50 accent-[var(--color-accent)] cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[11px] text-muted-foreground leading-tight select-none cursor-pointer">
                      I agree to the{" "}
                      <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Terms of Service displayed."); }} className="text-[var(--color-accent)] font-medium hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Privacy Policy displayed."); }} className="text-[var(--color-accent)] font-medium hover:underline">
                        Privacy Policy
                      </a>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Create Enterprise Account <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsRegister(false)}
                        className="font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
