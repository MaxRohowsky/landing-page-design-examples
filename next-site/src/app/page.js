'use client'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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


                    <Cards data={data} selectedTags={selectedTags} />



            </main>
        </>
    );
}


function Cards({ data, selectedTags }) {
    const [itemsToShow, setItemsToShow] = useState(100); // Start with showing 10 items

    const loadMoreItems = () => {
        setItemsToShow(itemsToShow + 5); // Load 10 more items when the user scrolls to the end
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log('scrolling');

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                console.log('load more items');
                loadMoreItems();
            }
        });
        return () => window.removeEventListener('scroll', loadMoreItems);
    }, [itemsToShow]);


    return (
        <div className="items-start z-10 w-full flex-wrap gap-4 justify-center text-sm flex">
            {data
                .filter(item => selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag.toLowerCase())))
                .slice(0, itemsToShow)
                .map((item, index) => (
                    <Card key={index} item={item} />
                ))}
        </div>
    );
}