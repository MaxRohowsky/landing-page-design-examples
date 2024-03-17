import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';


export default function Navbar() {

    return (
        <header>
            <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">

                        <Image
                            src="/landing-hero.png"
                            alt="Panda"
                            className=" rounded-full"
                            width={50}
                            height={50}
                        />

                        <span className="self-center sm:block hidden text-xl font-semibold whitespace-nowrap dark:text-white">
                            LandingHero

                        </span>

                    </div>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="text-white bg-github hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <FontAwesomeIcon icon={faGithub} className='pr-2' />
                            View on GitHub
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    </div>
                </div>
            </nav>
        </header>
    );
}