"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const handleEmailAuth = async (isSignUp: boolean) => {
    setIsLoadingAuth(true);
    setAuthError(null);
    setAuthSuccess(null);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError(error.message);
    } else {
      if (isSignUp) {
        setAuthSuccess("Sign up successful! You can now sign in.");
      } else {
        // Redirect on successful sign in
        window.location.href = "/";
      }
    }
    setIsLoadingAuth(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setIsLoadingAuth(true);
    setAuthError(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setAuthError(error.message);
      setIsLoadingAuth(false);
    }
  };

  return (
    <main className="login-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .login-main {
          min-height: 100vh;
          background: #FFFFFF;
          display: flex;
        }

        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 4rem 6rem;
          justify-content: center;
        }

        .login-right {
          flex: 1.2;
          position: relative;
          background: linear-gradient(135deg, #FDFBF9 0%, #EBE2D5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          overflow: hidden;
        }

        .visual-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          aspect-ratio: 4/3;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
        
        .visual-img {
          object-fit: cover;
        }

        .right-quote {
          position: absolute;
          bottom: 4rem;
          left: 4rem;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
          padding: 2rem 3rem;
          border-radius: 20px;
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 24px;
          font-style: italic;
          color: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.5);
          max-width: 400px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          position: absolute;
          top: 4rem;
          left: 6rem;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        .login-header {
          margin-bottom: 3rem;
          margin-top: 4rem;
        }

        .login-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 48px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 16px;
          color: #666;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          background: #F9F9F9;
          border: 1px solid #E0E0E0;
          padding: 1rem;
          border-radius: 12px;
          font-size: 14px;
          font-family: var(--font-sans, 'Inter', sans-serif);
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #000;
        }

        .btn-primary {
          width: 100%;
          background: #000;
          color: #FFF;
          border: none;
          padding: 1rem;
          border-radius: 30px;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #333;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 2rem 0;
          color: #999;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #E0E0E0;
        }

        .divider::before { margin-right: 1rem; }
        .divider::after { margin-left: 1rem; }

        .oauth-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .btn-oauth {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem;
          background: #FFF;
          border: 1px solid #E0E0E0;
          border-radius: 30px;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: #1A1A1A;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .btn-oauth:hover {
          background: #F9F9F9;
          border-color: #CCC;
        }

        .oauth-icon {
          width: 20px;
          height: 20px;
        }

        .forgot-link {
          display: block;
          text-align: center;
          margin-top: 1.5rem;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          color: #666;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        @media (max-width: 1024px) {
          .login-main {
            flex-direction: column;
          }
          .login-right {
            display: none;
          }
          .login-left {
            padding: 4rem 2rem;
          }
          .back-link {
            top: 2rem;
            left: 2rem;
          }
        }
      `}} />

      <div className="login-left">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>
        
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div className="login-header">
            <h1 className="login-title">Welcome to IDC</h1>
            <p className="login-subtitle">Sign in to access your luxury design dashboard.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleEmailAuth(false); }}>
            {authError && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '13px' }}>{authError}</div>}
            {authSuccess && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '13px' }}>{authSuccess}</div>}
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={isLoadingAuth} style={{ flex: 1 }}>
                {isLoadingAuth ? <Loader2 className="animate-spin" size={20} style={{ margin: '0 auto' }} /> : 'Sign In'}
              </button>
              <button type="button" className="btn-primary" disabled={isLoadingAuth} onClick={() => handleEmailAuth(true)} style={{ flex: 1, background: '#f0f0f0', color: '#000', border: '1px solid #ccc' }}>
                Sign Up
              </button>
            </div>
          </form>

          <div className="divider">or continue with</div>

          <div className="oauth-buttons">
            <button 
              className="btn-oauth" 
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoadingAuth}
            >
              Google
            </button>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="visual-container">
          <Image src="/images/login_visual.png" alt="Luxury Interior" fill className="visual-img" />
        </div>
        <div className="right-quote">
          "Transforming Spaces, Designing Life"
        </div>
      </div>
    </main>
  );
}
