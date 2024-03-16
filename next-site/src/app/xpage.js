'use client'
import Image from 'next/image';
import path from 'path';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/data.json');
      const data = await res.json();
      setData(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Image
          src="https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/screenshots/Scale.jpeg"
          alt="SCale"
          width={500}
          height={300}
        />
      </div>
      <p>Hello as das das das das </p>
    </main>
  );
}