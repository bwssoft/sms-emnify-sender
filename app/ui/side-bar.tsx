'use client';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import {
	Bars4Icon,
	BookOpenIcon,
	CpuChipIcon,
	XMarkIcon,
	UserIcon,
	CommandLineIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useContext, useState } from 'react';
import { userLogout } from '../lib/actions';
import Image from 'next/image';
import Logo from '../../public/logotipo.png';
import { NavBarContext } from '../contexts/NavBarContext';
import { Button } from './button';

export function SideBar() {
	const pathname = usePathname();
	const { isSideBarOpen, setIsSideBarOpen } = useContext(NavBarContext);
	const isOptionInCurrentPathname = useCallback(
		(href: string) => {
			if (href === '/' && pathname !== '/') {
				return false;
			}
			if (href === '/message' && pathname !== '/message') {
				return false;
			}
			return pathname.includes(href);
		},
		[pathname],
	);
	return (
		<>
			<Transition.Root show={isSideBarOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-40 lg:hidden"
					onClose={() => setIsSideBarOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute right-0 top-0 -mr-12 pt-2">
										<Button
											type="button"
											className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => setIsSideBarOpen(false)}
										>
											<span className="absolute -inset-0.5" />
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</Button>
									</div>
								</Transition.Child>
								<div className="mt-5 h-0 flex-1 overflow-y-auto">
									<nav className="px-2">
										<div className="space-y-1">
											{navigation.map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className={clsx(
														isOptionInCurrentPathname(item.href)
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
														'group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5',
													)}
													aria-current={
														isOptionInCurrentPathname(item.href)
															? 'page'
															: undefined
													}
												>
													<item.icon
														className={clsx(
															isOptionInCurrentPathname(item.href)
																? 'text-gray-500'
																: 'text-gray-400 group-hover:text-gray-500',
															'mr-3 h-6 w-6 flex-shrink-0',
														)}
														aria-hidden="true"
													/>
													{item.name}
												</Link>
											))}
										</div>
										{/* <div className="mt-8">
                      <h3
                        className="px-3 text-sm font-medium text-gray-500"
                        id="mobile-teams-headline"
                      >
                        Teams
                      </h3>
                      <div
                        className="mt-1 space-y-1"
                        role="group"
                        aria-labelledby="mobile-teams-headline"
                      >
                        {teams.map((team) => (
                          <a
                            key={team.name}
                            href={team.href}
                            className="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <span
                              className={clsx(
                                team.bgColorClass,
                                "mr-4 h-2.5 w-2.5 rounded-full"
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{team.name}</span>
                          </a>
                        ))}
                      </div>
                    </div> */}
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
						<div className="w-14 flex-shrink-0" aria-hidden="true">
							{/* Dummy element to force sidebar to shrink to fit close icon */}
						</div>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5">
				<div className="flex flex-shrink-0 items-center px-6">
					<Image src={Logo} alt="Logotipo" width={80} />
				</div>
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className="mt-5 flex h-0 flex-1 flex-col justify-between overflow-y-auto pt-1">
					{/* User account dropdown */}
					{/* <Menu as="div" className="relative inline-block px-3 text-left">
            <div>
              <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="flex w-full items-center justify-between">
                  <span className="flex min-w-0 items-center justify-between space-x-3">
                    <img
                      className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium text-gray-900">
                        Jessy Schwarz
                      </span>
                      <span className="truncate text-sm text-gray-500">
                        @jessyschwarz
                      </span>
                    </span>
                  </span>
                  <ChevronUpDownIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        View profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Notifications
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Get desktop app
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu> */}
					{/* Sidebar Search */}
					{/* <div className="mt-5 px-3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                aria-hidden="true"
              >
                <MagnifyingGlassIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
              />
            </div>
          </div> */}
					{/* Navigation */}
					<nav className="mt-6 px-3">
						<div className="space-y-1">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={clsx(
										isOptionInCurrentPathname(item.href)
											? 'bg-gray-200 text-gray-900'
											: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
										'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
									)}
									aria-current={
										isOptionInCurrentPathname(item.href) ? 'page' : undefined
									}
								>
									<item.icon
										className={clsx(
											isOptionInCurrentPathname(item.href)
												? 'text-gray-500'
												: 'text-gray-400 group-hover:text-gray-500',
											'mr-3 h-6 w-6 flex-shrink-0',
										)}
										aria-hidden="true"
									/>
									{item.name}
								</Link>
							))}
						</div>
						<div className="mt-8">
							{/* Secondary navigation */}
							{/* <h3
                className="px-3 text-sm font-medium text-gray-500"
                id="desktop-teams-headline"
              >
                Teams
              </h3>
              <div
                className="mt-1 space-y-1"
                role="group"
                aria-labelledby="desktop-teams-headline"
              >
                {teams.map((team) => (
                  <a
                    key={team.name}
                    href={team.href}
                    className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span
                      className={clsx(
                        team.bgColorClass,
                        "mr-4 h-2.5 w-2.5 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{team.name}</span>
                  </a>
                ))}
              </div> */}
						</div>
					</nav>
					<form action={userLogout}>
						<Button
							type="submit"
							className="flex items-center justify-start px-3"
						>
							<ArrowLeftIcon className="w-4 h-4" />
							Logout
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

const navigation = [
	// { name: "Home", href: "/", icon: HomeIcon },
	{ name: 'SIMCard', href: '/endpoint', icon: CpuChipIcon },
	{
		name: 'Mensagem',
		href: '/message',
		icon: Bars4Icon,
	},
	{
		name: 'Documentação',
		href: '/docs',
		icon: BookOpenIcon,
	},
	{
		name: 'Meu usuário',
		href: '/profile',
		icon: UserIcon,
	},
	{
		name: 'Comandos',
		href: '/command',
		icon: CommandLineIcon,
	},
];
// const teams = [
//   { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
//   { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
//   { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
// ];
