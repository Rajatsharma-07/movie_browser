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

    useEffect(() => {
      if(search !== ""){
        searchParams.set('search', search);
        setSearchParams(searchParams);
      }else{
        searchParams.delete('search');
        setSearchParams(searchParams)
      }
    }, [search])
    return (
        <div className="layout">
            <Header search={search} setSearch={setSearch} />
        <main className="main-content" style={{backgroundColor: 'black', color: 'whitesmoke'}}>
          <Outlet />
          {children}
        </main>
        <Footer />
      </div>
    )
}