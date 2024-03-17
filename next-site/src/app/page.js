'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/card';
import Banner from '@/components/banner';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';

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
            <Navbar />


            <main className="flex min-h-screen flex-col">
                <Hero />


                <div className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div className="w-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <div className="bg-white py-2 px-3 ">
                            <nav className="flex flex-wrap gap-4">
                                {['startup', 'bootstrap', 'vc'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out ${selectedTags.includes(tag) ? 'border-b-purple-600 text-purple-600' : 'text-gray-600 hover:border-b-purple-600 hover:text-purple-600'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                                <button onClick={resetFilters} className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-xs sm:text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
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