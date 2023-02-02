import Image from "next/image";
import { useState } from "react";
function Header() {
    const [mode, setMode] = useState("Light Mode")
    const changeTheme = (e:React.MouseEvent<HTMLImageElement>) =>{
      
        if (mode ==="Light Mode") {
            document.documentElement.classList.add("dark")
            document.documentElement.classList.remove("light")
            setMode("Dark Mode")
    }else{
            document.documentElement.classList.add("light") 
            document.documentElement.classList.remove("dark")
            setMode("Light Mode")
    }
    }
    return (<header>
        <h1>Where in the world?</h1>
        <div className="theme">
            <Image src="/theme.svg" alt="moon" width={20} height={20}
               onClick={changeTheme} />
            <p className="theme-text">{mode}</p>
        </div>
    </header>);
}

export default Header;