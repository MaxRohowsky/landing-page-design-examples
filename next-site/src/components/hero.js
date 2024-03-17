import Image from 'next/image'  

export default function Hero() {
    return(
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
                    <div className="w-full sm:w-auto absolute top-1/3 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center text-white mt-7 ">
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
                    </div>
                </div>

        </>
    )
}