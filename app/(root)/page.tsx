import TradingView from "@/components/trading-view";
import { CHART_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";

const Home = () => {
  const scriptConfigURL = 'https://s3.tradingview.com/external-embedding/embed-widget-';
  
  return (
    <div className="flex home-wrapper min-h-screen">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingView
            title="Market Overview"
            scriptUrl={`${scriptConfigURL}market-overview.js`}
            config={CHART_WIDGET_CONFIG} 
            className='custom-chart'      
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingView
            title="Stock HeatMap"
            scriptUrl={`${scriptConfigURL}stock-heatmap.js`}
            config={CHART_WIDGET_CONFIG}       
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingView
            scriptUrl={`${scriptConfigURL}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG} 
            className='custom-chart'      
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingView
            scriptUrl={`${scriptConfigURL}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}       
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
