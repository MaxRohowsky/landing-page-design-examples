import { faLayerGroup, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';


export default function Banner() {
    return (
        <div className="hidden lg:block w-full bg-[#17133A] py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 px-8">

                <div className="flex items-center justify-start">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-blue-300 px-2" />
                    <span className="text-xs text-gray-300">Over 100+ Landing Pages</span>
                </div>

                <div className="flex items-center justify-start">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 px-2" />
                    <span className="text-xs text-gray-200">
                        <a href="https://github.com/maxontech/landing-page-design-examples" target="_blank" rel="noopener noreferrer">
                            Open Source on GitHub
                        </a>
                    </span>
                </div>

                <div className="flex items-center justify-start">
                    <FontAwesomeIcon icon={faPeopleGroup} className="text-pink-500 px-2" />
                    <span className="text-xs text-gray-300">
                        <a href="https://www.youtube.com/@maxontech" target="_blank" rel="noopener noreferrer">
                            Community of 10,000+ Developers
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
