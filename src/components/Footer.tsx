import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import LinkedIcon from '../assets/icons/linkedIn/icons8-linkedin.svg';
import GithubIcon from '../assets/icons/github/icons8-github.svg';
import {DisclosurePage} from "../pages/disclosurePage/DisclosurePage.tsx";


export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-10">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-sm">
                        © 2024 Filip Todorović.
                    </div>
                    <div  className="flex space-x-4">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/filip-todorovi%C4%87-8189b9230/" className="">
                            <img
                              className={"h-20 w-auto transition-transform transform hover:scale-150"}
                                alt={'linkedIn icon'}
                                src={LinkedIcon}
                            />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/filip-tod" className="">
                            <img
                              className={"h-20 w-auto transition-transform transform hover:scale-150"}
                                alt={'github icon'}
                                src={GithubIcon}
                            />
                        </a>
                    </div>
                </div>
                <div className="mt-4">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <DisclosureButton className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-400 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                                    <span>More Info On The Application</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-400`}
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-400">
                                    <DisclosurePage/>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </footer>
    );
}
