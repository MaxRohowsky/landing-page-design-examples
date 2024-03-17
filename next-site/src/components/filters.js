import React, { useEffect } from 'react';

export default function Filters({ selectedTags, handleTagClick, resetFilters }) {
    useEffect(() => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        const slider = document.querySelector('.custom-scrollbar');
        
        if (slider) {
            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            
            slider.addEventListener('mouseleave', () => {
                isDown = false;
            });
            
            slider.addEventListener('mouseup', () => {
                isDown = false;
            });
            
            slider.addEventListener('mousemove', (e) => {
                
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
            });
            
            slider.addEventListener('wheel', (e) => {
                e.preventDefault();
                slider.scrollLeft += e.deltaY;
            });
        }
    }, []);

    return (
        <div className="w-full z-20  max-w-screen-xl mx-auto m-6  rounded-md">
            <div className="flex m-1">
                <button onClick={resetFilters} className="whitespace-nowrap mr-4 m-2
                    px-3 text-xs sm:text-sm font-medium text-back transition-all duration-200 ease-in-out  hover:text-red-500 bg-white rounded-md  ">
                    ❌ Reset Filters
                </button>
                <div className="overflow-x-scroll filter-scrollbar px-1 bg-slate-300 rounded-md p-2">
                    <nav className="flex gap-4 ">
                        {['🚀 Startup', '👢 Bootstrap', '💼 VC', '☁️ SAAS', '🌐 Web', '📈 Marketing', '🎁 Product', '🎨 Design', '💻 Tech', '💰 Finance', '🎓 Education', '🏥 Healthcare', '🌳 Nonprofit', '🛍️ Ecommerce', '🎥 Video', '📸 Photography', '🎵 Music', '🍽️ Food', '🏋️ Fitness', '🌍 Travel', '🏠 Real Estate', '👔 Corporate', '👨‍💻 Freelance'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag.slice(3))}
                                className={`bg-white rounded-md  whitespace-nowrap  py-2 px-3 text-xs sm:text-sm font-medium 
                                     ${selectedTags.includes(tag.slice(3)) ? 'bg-green-600 text-white' : 'text-black hover:scale-105 transition-all duration-200 ease-in-out hover:bg-slate-400 hover:text-white'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </nav>
                </div>

            </div>
        </div>
    );
}