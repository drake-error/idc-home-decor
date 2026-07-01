import React from 'react';
import ErrorDisplay from '../components/ErrorDisplay';

export default function NotFound() {
  return (
    <ErrorDisplay 
      message="The page you're looking for doesn't exist or may have been moved."
    />
  );
}
