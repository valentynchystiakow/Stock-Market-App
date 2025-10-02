// marks file as client component
'use client';

// imports required modules and components
import { useCallback, useRef } from 'react';


// creates and exports useDebounce hook that debounces a callback function by a specified delay
export function useDebounce(callback: () => void, delay: number) {

    // useRef - creates a mutable object that persists for the entire lifecycle of the component
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // useCallback - creates a memoized callback function that only changes if its dependencies change
    return useCallback(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay])
}