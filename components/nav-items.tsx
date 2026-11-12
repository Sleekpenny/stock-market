'use client';

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./searh";

const NavItems = ({initialStocks}: {initialStocks: StockWithWatchlistStatus[]}) => {
    const pathName = usePathname()

    const isActive = (path:string) => {
        if (path === '/') return pathName === '/';
        return pathName.startsWith(path)
    }

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map((navItem) => {                
                if(navItem.title === 'Search') return (
                    <li key="search-trigger">
                        <Search 
                        label="Search"
                        initialStocks={initialStocks}
                        renderAs="text"
                        />
                    </li>
                )
                return (<li key={navItem.href}>
                    <Link href={navItem.href} className={`hover:text-yellow-400 transition-colors ${isActive(navItem.href) ? 'text-gray-100' : ''}`}>{navItem.title}</Link>
                </li>)
                })}
        </ul>
    )
}

export default NavItems