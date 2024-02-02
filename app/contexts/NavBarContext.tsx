'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavBarContextProps {
	isSideBarOpen: boolean;
	setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Set the default value to an initial state
const initialNavBarContext: NavBarContextProps = {
	isSideBarOpen: false,
	setIsSideBarOpen: () => {},
};

export const NavBarContext =
	createContext<NavBarContextProps>(initialNavBarContext);

interface NavBarContextProviderProps {
	children: ReactNode;
}

export const NavBarContextProvider: React.FC<NavBarContextProviderProps> = ({
	children,
}) => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(
		initialNavBarContext.isSideBarOpen,
	);

	return (
		<NavBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
			{children}
		</NavBarContext.Provider>
	);
};
