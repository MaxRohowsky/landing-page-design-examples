'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function Card({ item }) {
    return (
        <div className="flex flex-col justify-center mr-1 ml-1 mt-1 mb-3">
            <div className="flex flex-col items-start">
                <div className='overflow-hidden rounded-xl w-[350px] h-[400px] transition-transform duration-500 ease-in-out transform lg:hover:scale-105 shadow-md'>
                    <Image
                        src={`https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/${item.screenshotPath}`}
                        alt={item.title}
                        width={500}
                        height={600}
                    />
                </div>
                <span className="flex justify-between items-baseline mt-2 pl-1 pr-1 w-[350px]">
                    <h2 className=" font-semibold text-base">{item.companyName}</h2>
                    <div className="flex space-x-2 text-base font-normal" >
                        <p className="">
                            {item.stack !== "" && <FontAwesomeIcon className="mx-1" icon={faLayerGroup} />}
                            {item.stack}
                        </p>
                        <p className=""><FontAwesomeIcon className="mx-1" icon={faClock} />{item.timeToPageLoad}ms</p>
                    </div>
                </span>
                <span className="flex flex-wrap items-baseline pl-1 pr-1 w-[350px] overflow-auto whitespace-normal">
                    {item.tags.map((tag, index) => (
                        <p key={index} className="text-base pr-2 font-normal text-gray-600">{"#" + tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
                    ))}
                </span>

            </div>
        </div>
    );
}

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
        <main className="flex min-h-screen flex-col">
            <div className="h-[600px] bg-gray-200 relative">
                <Image
                    src="/panoramic.png"
                    layout="fill"
                    objectFit="cover"
                    alt="Hero Image"
                ></Image>
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.8)]">
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h1 className="text-4xl font-bold">Discover the web's best Landing Pages</h1>
                    <p className="mt-4 text-xl">This Site features the best landing page designs on the web! Learn from the best and get inspiration from real landing page examples.</p>
                </div>
            </div>
 <div className="flex justify-center my-4">
                {['startup', 'bootstrap', 'vc'].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-4 py-2 m-1 border rounded ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
                <button onClick={resetFilters} className="px-4 py-2 m-1 border rounded bg-red-500 text-white">
                    Reset Filters
                </button>
            </div>
            <div className="items-start z-10 w-full flex-wrap gap-4 justify-center text-sm lg:flex">
                {data.filter(item => selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag))).map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </div>
        </main>
    );
}