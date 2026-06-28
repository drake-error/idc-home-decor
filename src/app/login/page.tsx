"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [isLoadingProvider, setIsLoadingProvider] = useState<string | null>(null);

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setIsLoadingProvider(provider);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      console.error('Error logging in:', error.message);
      setIsLoadingProvider(null);
    }
    // Note: if successful, the page will redirect away, so the loading spinner stays active until redirect.
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

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="Enter your email" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Enter your password" />
            </div>

            <button type="submit" className="btn-primary">Sign In</button>
            <a href="#" className="forgot-link">Forgot your password?</a>
          </form>

          <div className="divider">or continue with</div>

          <div className="oauth-buttons">
            <button 
              className="btn-oauth" 
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoadingProvider !== null}
            >
              {isLoadingProvider === 'google' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <svg className="oauth-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Google
            </button>

            <button 
              className="btn-oauth" 
              onClick={() => handleOAuthLogin('facebook')}
              disabled={isLoadingProvider !== null}
            >
              {isLoadingProvider === 'facebook' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <svg className="oauth-icon" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              Facebook
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
