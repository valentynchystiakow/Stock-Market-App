// marks file as client part
'use client';

// imports required modules and components
import { useEffect, useRef }     from "react";

// creates reusable custom useTradingViewWidget component(hook)
const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    // uses useRef hook to save changing states after rerendering containerRef component
    const containerRef = useRef<HTMLDivElement | null>(null);

    // uses useEffect hook to manipulate loading of chart's data if dependencies were changed
    useEffect(() => {
        // validates containerRef and dataset before creating
        if (!containerRef.current) return;
        if (containerRef.current.dataset.loaded) return;
        containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.innerHTML = JSON.stringify(config);

        containerRef.current.appendChild(script);
        containerRef.current.dataset.loaded = 'true';

        return () => {
            if(containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;
            }
        }
    }, [scriptUrl, config, height])

    return containerRef;
}

// exports default custom hook
export default useTradingViewWidget