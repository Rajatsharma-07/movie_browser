import { useEffect, useState } from "react"
import { Outlet, useSearchParams } from "react-router-dom"
import { Footer } from "./footer/footer"
import { Header } from "./header/header"
import './layout.css'

type Props = {
    children: React.ReactNode
}
export const Layout = ({ children }: Props) => {
    const [search, setSearch] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();

    // This useEffect handles the searching throughout the project by adding the search string in the URL as url search params.
    useEffect(() => {
      if(search !== ""){
        searchParams.set('search', search);
        setSearchParams(searchParams);
      }else{
        searchParams.delete('search');
        setSearchParams(searchParams)
      }
    }, [search]);

    return (
        <div className="layout">
          {/* This is a header */}
            <Header search={search} setSearch={setSearch} />
            {/* This is where our all the components will get rendered */}
        <main className="main-content" style={{backgroundColor: 'black', color: 'whitesmoke'}}>
          <Outlet />
          {children}
        </main>
        {/* This is a demo footer */}
        <Footer />
      </div>
    )
}