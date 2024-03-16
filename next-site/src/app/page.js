'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function Card({ item }) {
    return (
        <div className="flex flex-col items-center justify-center mr-1 ml-1 mt-1 mb-3">
            <div className="flex flex-col items-start">
                <div className='overflow-hidden rounded-xl  w-[350px] h-[400px]'>
                    <Image
                        src={`https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/${item.screenshotPath}`}
                        className='object-cover w-full'
                        alt={item.title}
                        width={500}
                        height={600}
                    />
                </div>
                <span className="w-full flex justify-between items-baseline mt-2 pl-1 pr-1">
                    <h2 className=" font-semibold text-base">{item.companyName}</h2>
                    <div className="flex space-x-2 text-base font-normal" >
                        <p className=""><FontAwesomeIcon className="mx-1" icon={faLayerGroup} />{item.stack}</p>
                        <p className=""><FontAwesomeIcon className="mx-1" icon={faClock} />{item.timeToPageLoad}ms</p>
                    </div>
                </span>
                <span className="w-full flex  items-baseline pl-1 pr-1">
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

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/data.json');
            const data = await res.json();
            setData(data);
        };

        fetchData();
    }, []);

    return (
        <main className="flex min-h-screen flex-col  p-1">
            <div className="z-10 w-full flex-wrap gap-4 justify-center text-sm lg:flex">



                {data.map((item, index) => (

                    <Card key={index} item={item} />

                ))}
            </div>
        </main>
    );
}