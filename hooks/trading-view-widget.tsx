// hooks/trading-view-widget.ts
"use client";

import { useEffect, useRef } from "react";

const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      script.remove();
      const widget = container.querySelector(
        ".tradingview-widget-container__widget",
      );
      if (widget) widget.innerHTML = "";
    };
  }, [scriptUrl, config]);

  return containerRef;
};

export default useTradingViewWidget;