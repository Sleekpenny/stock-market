import Link from "next/link";
import Image from "next/image";
import NavItems from "./nav-items";
import DropDown from "./drop-down";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href='/'>
                    <Image src="/assets/icons/logo.svg" alt="Signalist Logo" width={140} height={32}/>
                </Link>

                <nav className="hidden sm:block">
                <NavItems />
                </nav>
                <DropDown />
            </div>
        </header>
    )
}

export default Header;