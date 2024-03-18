import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import { useState } from 'react';

export default function Navbar() {
    const [buttonText, setButtonText] = useState('Star on GitHub');


    return (
        <header>
            <nav className="bg-white  w-full z-20 top-0 start-0 border-b border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                    <div className="flex items-center space-x-3">

                        <Image
                            src="/landing-hero.png"
                            alt="Panda"
                            className=" rounded-full"
                            width={50}
                            height={50}
                        />

                        <span className="self-center sm:block hidden text-xl font-semibold whitespace-nowrap " >
                            LandingHero
                        </span>

                    </div>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 ">

                        <a href="https://github.com/maxontech/landing-page-design-examples" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="text-white bg-github hover:bg-blue-500 active:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                                onMouseEnter={() => { confetti(); setButtonText("Make my Day!"); }} onMouseLeave={() => setButtonText('Star on GitHub')}>
                                <FontAwesomeIcon icon={faStar} className='pr-2 gold-pulsate' />
                                {buttonText}
                            </button>
                        </a>

                    </div>
                </div>
            </nav>
        </header>
    );
}