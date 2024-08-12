import { useEffect, useState } from "react"
import { WishlistMovieList } from "./wishlist-movie-list";
import { useSearchParams } from "react-router-dom";

export const Wishlist = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [wishlistMovies, setWishlistMovies] = useState<any>([]);
    const [initialLoader, setInitialLoader] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<any>([]);
    const [wishlistChanged, setWishlistChanged] = useState<boolean>(true);
    useEffect(() => {
        if(wishlistChanged){
            setInitialLoader(true);
            setTimeout(() => {
                setWishlistMovies(JSON.parse(localStorage.getItem('wishlist') || "[]"));
                setInitialLoader(false);
                setWishlistChanged(false);
            }, 1000)
        }
    }, [wishlistChanged]);

    useEffect(() => {
        let search = searchParams.get('search') ? searchParams.get('search') : "";
        if (search == "") {
            setSearchData(wishlistMovies);
        } else {
            let data = wishlistMovies.filter((movie: any) => movie.title.toLowerCase().includes(search?.toLowerCase()));
            setSearchData(data);
        }
    }, [searchParams])
    return(
        <WishlistMovieList
            initialLoader={initialLoader}
            movies={wishlistMovies}
            searchData={searchData}
            search={searchParams?.get('search') ? searchParams?.get('search') : ""}
            setWishlistChanged={setWishlistChanged}
            />
    )
}