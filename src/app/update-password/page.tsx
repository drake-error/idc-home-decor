"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Key } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is authenticated. When arriving from a reset password email link,
    // Supabase will automatically parse the hash and establish a session.
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUpdateError("Your session is invalid or has expired. Please try resetting your password again.");
      }
    };
    checkSession();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setUpdateError(error.message);
    } else {
      setUpdateSuccess("Your password has been successfully updated! You will be redirected shortly.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    setIsUpdating(false);
  };

  return (
    <main className="login-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .login-main {
          min-height: 100vh;
          background: transparent;
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
          background: transparent;
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary:hover:not(:disabled) {
          background: #333;
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
        <Link href="/login" className="back-link">
          <ArrowLeft size={16} /> BACK TO LOGIN
        </Link>
        
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div className="login-header">
            <h1 className="login-title">Reset Password</h1>
            <p className="login-subtitle">Enter your new secure password below to regain access.</p>
          </div>

          <form onSubmit={handleUpdatePassword}>
            {updateError && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '13px', padding: '1rem', background: '#ffebee', borderRadius: '8px' }}>{updateError}</div>}
            {updateSuccess && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '13px', padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>{updateSuccess}</div>}
            
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter new password (min. 6 characters)" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                required 
                minLength={6}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isUpdating || newPassword.length < 6}>
              {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <><Key size={18} /> Update Password</>}
            </button>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="visual-container">
          <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop" alt="Luxury Interior Security" fill className="visual-img" />
        </div>
        <div className="right-quote">
          "Security meets luxury."
        </div>
      </div>
    </main>
  );
}
