import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faClock } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';

export default function Card({ item }) {
    return (
        <div className="flex flex-col justify-center mr-1 ml-1 mt-1 mb-3">
            <div className="flex flex-col items-start">
                <div className='overflow-y-auto card-scrollbar rounded-sm w-[350px] h-[400px] transition-transform duration-500 ease-in-out transform lg:hover:scale-105 shadow-md'>
                    <Image
                        src={`https://raw.githubusercontent.com/maxontech/landing-page-design-examples/master/docs/${item.screenshotPath}`}
                        alt={item.title}
                        width={500}
                        height={600}
                    />
                </div>
                <span className="flex justify-between items-baseline mt-2 pl-1 pr-1 w-[350px]">
                    <h2 className=" font-semibold text-sm">{item.companyName}</h2>
                    <div className="flex space-x-1 text-sm font-normal" >
                        <p className="">
                            {item.stack !== "" && <FontAwesomeIcon className="mx-1" icon={faLayerGroup} />}
                            {item.stack}
                        </p>
                        <p className=""><FontAwesomeIcon className="mx-1" icon={faClock} />{item.timeToPageLoad}ms</p>
                    </div>
                </span>
                <span className="flex flex-wrap items-baseline pl-1 pr-1 w-[350px] overflow-auto whitespace-normal">
                    {item.tags.map((tag, index) => (
                        <p key={index} className="text-sm pr-2 font-normal text-gray-600">{"#" + tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
                    ))}
                </span>

            </div>
        </div>
    );
}