'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/card';
import Banner from '@/components/banner';

export default function Home() {
    const [data, setData] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tag) => {
        setSelectedTags(prevTags => {
            if (prevTags.includes(tag)) {
                // Remove tag from selected tags
                return prevTags.filter(t => t !== tag);
            } else {
                // Add tag to selected tags
                return [...prevTags, tag];
            }
        });
    };

    const resetFilters = () => {
        setSelectedTags([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/data.json');
            const data = await res.json();
            setData(data);
        };

        fetchData();
    }, []);

    return (
        <>  
            <Banner />
            
            <header>


                <nav class="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                                </li>
                                <li>
                                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                                </li>
                                <li>
                                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="flex min-h-screen flex-col">
                <div className="h-[650px] bg-gray-200 relative">
                    <Image
                        src="/panoramic.png"
                        layout="fill"
                        objectFit="cover"
                        alt="Hero Image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(31,78,158,1)] via-[rgba(31,78,158,0.85)]  to-[rgba(31,78,158,0.9)]">
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white pb-1">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/laurels.png"
                                width={200}
                                height={200}
                            />
                        </div>
                        <h1 className="text-4xl font-bold">Discover the web's best Landing Pages</h1>
                        <p className="mt-4 text-xl">This Site features the best landing page designs on the web! Learn from the best and get inspiration from real landing page examples.</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="w-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="bg-white py-2 px-3 ">
                        <nav className="flex flex-wrap gap-4">
                            {['startup', 'bootstrap', 'vc'].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out ${selectedTags.includes(tag) ? 'border-b-purple-600 text-purple-600' : 'text-gray-600 hover:border-b-purple-600 hover:text-purple-600'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                            <button onClick={resetFilters} className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
                                Reset Filters
                            </button>
                        </nav>
                    </div>
                </div>
                </div>
                <div className="items-start z-10 w-full flex-wrap gap-4 justify-center text-sm lg:flex">
                    {data.filter(item => selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag))).map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            </main>
        </>
    );
}