"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ErrorDisplayProps {
  leftChar?: string;
  rightChar?: string;
  message: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function ErrorDisplay({
  leftChar = "4",
  rightChar = "4",
  message,
  buttonText = "BACK TO HOME",
  buttonHref = "/",
  onButtonClick
}: ErrorDisplayProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAF9F6',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '4rem'
      }}>
        <span style={{
          fontFamily: 'var(--font-serif, "Playfair Display", serif)',
          fontSize: 'clamp(120px, 20vw, 250px)',
          fontWeight: 600,
          color: '#2A2522',
          lineHeight: 1
        }}>
          {leftChar}
        </span>
        
        <div style={{
          position: 'relative',
          width: 'clamp(100px, 15vw, 180px)',
          aspectRatio: '1/1',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <Image 
            src="/images/404_mirror.png" 
            alt="0" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>

        <span style={{
          fontFamily: 'var(--font-serif, "Playfair Display", serif)',
          fontSize: 'clamp(120px, 20vw, 250px)',
          fontWeight: 600,
          color: '#2A2522',
          lineHeight: 1
        }}>
          {rightChar}
        </span>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '1px',
        backgroundColor: '#D1CFC7',
        marginBottom: '3rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '2px',
          backgroundColor: '#2A2522'
        }} />
      </div>

      <p style={{
        fontFamily: 'var(--font-sans, "Inter", sans-serif)',
        fontSize: '16px',
        color: '#4A4643',
        marginBottom: '3rem',
        fontWeight: 500
      }}>
        {message}
      </p>

      {onButtonClick ? (
        <button 
          onClick={onButtonClick}
          style={{
            backgroundColor: '#000',
            color: '#FAF9F6',
            border: 'none',
            padding: '1rem 3rem',
            fontFamily: 'var(--font-sans, "Inter", sans-serif)',
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000'}
        >
          {buttonText}
        </button>
      ) : (
        <Link 
          href={buttonHref}
          style={{
            display: 'inline-block',
            backgroundColor: '#000',
            color: '#FAF9F6',
            textDecoration: 'none',
            padding: '1rem 3rem',
            fontFamily: 'var(--font-sans, "Inter", sans-serif)',
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000'}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
