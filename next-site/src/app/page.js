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
import Filters from '@/components/filters';

export default function Home() {
    const [data, setData] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tag) => {
        console.log(selectedTags);
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

                <Filters selectedTags={selectedTags} handleTagClick={handleTagClick} resetFilters={resetFilters} />

                <div className="items-start z-10 w-full flex-wrap gap-4 justify-center text-sm lg:flex">
                    {data.filter(item => selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag.toLowerCase()))).map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
                
            </main>
        </>
    );
}

