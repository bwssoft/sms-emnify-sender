import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import '@radix-ui/themes/styles.css';
import { SideBar } from '../ui/side-bar';
import { Navbar } from '../ui/nav-bar';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { NavBarContextProvider } from '../contexts/NavBarContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'BW Send',
	description: 'Generated by BWSoft',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NavBarContextProvider>
			<html lang="en" className="h-full bg-white">
				<body className={`h-full ${inter.className}`}>
					<Theme className="h-full">
						<Toaster position="top-center" />
						<SideBar />
						<div className="h-full lg:pl-64">
							<Navbar />
							<div className="w-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-57px)] overflow-hidden h-full">
								{children}
							</div>
						</div>
					</Theme>
				</body>
			</html>
		</NavBarContextProvider>
	);
}
