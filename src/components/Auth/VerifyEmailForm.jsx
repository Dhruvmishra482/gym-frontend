import { Mail, Shield, Clock, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyEmailForm = ({
  mounted,
  otp,
  handleOTPChange,
  handleSubmit,
  handleResendOTP,
  isSubmitting,
  isResending,
  timeLeft,
  canResend,
  formatTime,
  email,
  mousePosition
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full opacity-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Mouse follower effect */}
      {mounted && (
        <div
          className="fixed pointer-events-none z-0 opacity-25"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            transition: "all 0.1s ease-out"
          }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl"></div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate("/signup")}
          className="group flex items-center text-purple-300 hover:text-white mb-6 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-4px] transition-transform duration-300" />
          <span className="text-sm">Back to Sign Up</span>
        </button>

        <div className={`
          backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8
          transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-purple-200 text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-white font-medium mt-1">
              {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-200">
                Enter OTP Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => handleOTPChange(e.target.value)}
                  placeholder="123456"
                  className="
                    w-full pl-10 pr-4 py-3 rounded-lg
                    backdrop-blur-sm bg-white/10 border border-white/20
                    text-white placeholder-purple-300
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-300 text-center text-lg font-mono tracking-wider
                  "
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              </div>
            </div>

            {/* Timer */}
            {!canResend && (
              <div className="flex items-center justify-center space-x-2 text-purple-300 text-sm">
                <Clock className="w-4 h-4" />
                <span>Code expires in {formatTime(timeLeft)}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className={`
                w-full py-3 px-4 rounded-lg font-medium text-white
                bg-gradient-to-r from-purple-600 to-pink-600
                hover:from-purple-700 hover:to-pink-700
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl
                ${isSubmitting ? 'animate-pulse' : ''}
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="inline-flex items-center space-x-2 text-purple-300 hover:text-white transition-colors duration-300"
                >
                  <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                  <span>{isResending ? 'Sending...' : 'Resend Code'}</span>
                </button>
              ) : (
                <p className="text-purple-400 text-sm">
                  Didn't receive the code? You can resend in {formatTime(timeLeft)}
                </p>
              )}
            </div>
          </form>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-purple-300 text-xs">
              Check your spam folder if you don't see the email
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 text-center">
          <p className="text-purple-400 text-sm">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;