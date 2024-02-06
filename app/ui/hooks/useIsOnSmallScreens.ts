'use client'

import { useEffect, useState } from "react";

export function useIsOnSmallScreens(): boolean {
  const [isOnSmallerScreens, setIsOnSmallerScreens] = useState<boolean>(false);

  useEffect(() => {
    const windowHeight = window.innerWidth

    if (windowHeight < 1024) setIsOnSmallerScreens(true)
  }, [])

  return isOnSmallerScreens
}