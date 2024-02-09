'use client';

import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import '@radix-ui/themes/styles.css';
import '../globals.css';

import { SideBar } from '../ui/side-bar';
import { Navbar } from '../ui/nav-bar';
import Componente from './profile/componente';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	function openSidebar() {
		setSidebarOpen(true);
	}

	return (
		<html lang="en" className="h-full bg-white">
			<body className={`h-full ${inter.className}`}>
				<Theme className="h-full overflow-hidden">
					<Toaster position="top-center" />
					<SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
					<div className="h-full lg:pl-64">
						<div className="flex items-center justify-between pr-7  border-b border-gray-200 bg-white">
							<Navbar openSidebar={openSidebar} />
							<Componente />
						</div>
						<div className="w-full h-full">{children}</div>
					</div>
				</Theme>
			</body>
		</html>
	);
}
