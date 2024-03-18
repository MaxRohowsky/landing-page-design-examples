import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import confetti from 'canvas-confetti'

export default function Hero() {
    return (
        <>
            <div className="h-[400px] sm:h-[600px] bg-gray-200 relative">
                <Image
                    src="/panoramic.png"
                    layout="fill"
                    objectFit="cover"
                    alt="Hero Image"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(31,78,158,1)] via-[rgba(31,78,158,0.85)]  to-[rgba(31,78,158,0.9)]">
                </div>
                <div className="w-full sm:w-auto absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center  text-white ">
                    <div className="flex justify-center mb-2 sm:hidden">
                        <Image
                            src="/laurels-color.png"
                            width={150}
                            height={200}
                        />
                    </div>
                    <div className="justify-center mb-8 hidden sm:flex">
                        <Image
                            src="/laurels-color.png"
                            width={220}
                            height={200}
                        />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold pb-3">Discover the Best Landing Pages</h1>

                    <p className="mt-4 text-sm sm:text-xl font-medium "> Your One-Stop for High Conversion Landing Designs & Inspiration! Hand-picked to ensure Highest Quality.</p>

                    <div className="flex justify-center mt-6">
                        <a href="https://www.producthunt.com/posts/landinghero?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-landinghero" onMouseEnter={() => { confetti();}} target="_blank" rel="noopener noreferrer">
                            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=445519&theme=dark" alt="LandingHero - Showcase of Beautiful Landing Pages | Product Hunt" style={{ width: '250px', height: '54px' }} />
                        </a>
                    </div>



                    {/*<p className='mt-4 text-lg font-semibold text-blue-300'>
                        made by
                        <a href="https://twitter.com/max_on_tech" target="_blank" rel="noopener noreferrer" className='ml-2 text-blue-300 hover:text-blue-600 transition-colors duration-200'>
                            <FontAwesomeIcon icon={faTwitter} />
                            <span className='ml-2'>Max</span>
                        </a>
                    </p>*/}
                </div>
            </div>

        </>
    )
}


