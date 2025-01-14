'use client'

import Image from "next/image";
import {useEffect, useState} from "react";
import { format } from 'date-fns';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = format(now, 'yyyy/MM/dd HH:mm:ss');
      setCurrentDate(formattedDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex w-full justify-between">
      <div className='flex flex-col gap-5'>
        <p className='text-5xl font-extrabold'>Welcome Back</p>
        <p className='text-5xl font-extrabold'>超级管理员</p>
      </div>
      <div className='pt-8 text-5xl font-extrabold'>{currentDate}</div>
    </div>
  );
}
