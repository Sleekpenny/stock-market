"use client"

import { useEffect, useState } from "react"
import { Command, CommandItem, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import {Button} from "@/components/ui/button";
import {Loader2,  TrendingUp} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { searchStocks } from "@/lib/actions/finhub.actions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";


const Search = ({ renderAs = 'button', label = 'Add stock', initialStocks }: SearchCommandProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);
  
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSearch = async () => {
    if(!isSearchMode) return setStocks(initialStocks);

    setLoading(true)
    try {
        const results = await searchStocks(searchTerm.trim());
        setStocks(results);
    } catch {
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  }

  return (
    <>
      {renderAs === 'text' ? (
          <span onClick={() => setOpen(true)} className="search-text">
            {label}
          </span>
      ): (
          <Button onClick={() => setOpen(true)} className="search-btn">
            {label}
          </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="search-dialog p-0">
    <DialogTitle className="sr-only">Search stocks</DialogTitle>

    <Command shouldFilter={false}>
      <div className="search-field">
        <CommandInput
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder="Search stocks..."
          className="search-input"
        />
        {loading && <Loader2 className="search-loader" />}
      </div>

      <CommandList className="search-list">
        {loading ? (
          <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
        ) : !displayStocks?.length ? (
          <div className="search-list-indicator">
            {isSearchMode ? "No results found" : "No stocks available"}
          </div>
        ) : (
          <>
            <div className="search-count">
              {isSearchMode ? "Search results" : "Popular stocks"} ({displayStocks.length})
            </div>
            {displayStocks.map((stock) => (
              <CommandItem
                key={stock.symbol}
                value={`${stock.symbol} ${stock.name}`}
                onSelect={() => {
                  router.push(`/stocks/${stock.symbol}`);
                  handleSelectStock();
                }}
                className="search-item search-item-link"
              >
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <div className="search-item-name">{stock.name}</div>
                  <div className="text-sm text-gray-500">
                    {stock.symbol} | {stock.exchange} | {stock.type}
                  </div>
                </div>

              </CommandItem>
            ))}
          </>
        )}
      </CommandList>
    </Command>
  </DialogContent>
</Dialog>
    </>
  )
}

export default Search;