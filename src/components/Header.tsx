import Image from "next/image";

function Header() {
    return (<header>
        <h1>Where in the world?</h1>
        <div className="theme">
            <Image src="/theme.svg" alt="moon" width={50} height={50}
                />
            <p className="theme-text">Dark Mode</p>
        </div>
    </header>);
}

export default Header;