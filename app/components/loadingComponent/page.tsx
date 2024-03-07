'use client';
import React from 'react';
import { CircularProgress } from '@nextui-org/react';

const page: React.FC = () => {
  const [value, setValue] = React.useState<number>(() => {
    const storedValue = localStorage.getItem('loadingValue');
    return storedValue ? parseInt(storedValue, 10) : 0;
  });

  React.useEffect(() => {
    localStorage.setItem('loadingValue', value.toString());
  }, [value]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="flex justify-center items-center h-screen">
       <CircularProgress size="lg" aria-label="Loading..."/>
    </div>
  );
};

export default page;
