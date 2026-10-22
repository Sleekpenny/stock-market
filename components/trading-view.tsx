"use client";
import useTradingViewWidget from "@/hooks/trading-view-widget";
import { cn } from "cn";
import { memo } from "react";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingView = ({
  title,
  scriptUrl,
  config,
  className
}: TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config,);

  return (
    <div className="w-full"> 
      {title && (<h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3> )}
      <div className={cn("tradingview-widget-container", className)} ref={containerRef} style={{ height: "100%", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ width: "100%" }} />
    </div>
    </div>
  );
};

export default memo(TradingView);
