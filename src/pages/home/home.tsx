import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { FilterDrawer } from '../filters/filters';
import { HomeMovieList } from "./home-movie-list";
import './home.css';

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoader, setInitialLoader] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [wishlistMovies, setWishlistMovies] = useState<any>([]);
    const [searchData, setSearchData] = useState<any>([]);
    const [wishlistChanged, setWishlistChanged] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [showingSearchData, setShowingSearchData] = useState<boolean>(false);

    // This functions opens the filter drawer
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // This functions closes the filter drawer
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // This useEffect calls the API for the first time
    useEffect(() => {
        setInitialLoader(true);
        // Added Timeout so that loading and fetching looks real
        setTimeout(() => {
            loadData();
        }, 1000);
    }, [])

    // This useEffect is called whenever we click the wishlist button
    useEffect(() => {
        if (wishlistChanged) {
            setWishlistMovies(JSON.parse(localStorage.getItem('wishlist') || "[]"));
            setWishlistChanged(false);
        }
    }, [wishlistChanged])

    // This function is responsible for the movie API call
    const loadData = async () => {
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTc1ODU2YTE4NjBhZWVkNzA0NmIxOTgxYTM2YmY1MiIsIm5iZiI6MTcyMzQwNTQzMi42MzkyNzYsInN1YiI6IjYwOTRlM2EzMWI3MjJjMDAzZGY4OTkzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ySDF1PXDoilCRA9pNvTHdNutg8mUJif7AcaeGhT5b8'
            }
        };
        fetch(url, options)
            .then(async (res) => {
                let movies_list = JSON.parse(JSON.stringify(movies));
                let response = await res.json();
                if (response?.results?.length > 0) {
                    movies_list = [...movies_list, ...response.results]
                    setMovies(movies_list);
                    setSearchData(movies_list);
                    setPage(prevPage => prevPage + 1);
                } else {
                    setHasMore(false);
                }
                setInitialLoader(false);
                setLoader(false);
            })
            .catch((err) => console.log(err));
    }

    // This is the useEffect where we check for the scrolling feature for infinite scrolling
    useEffect(() => {
        !showingSearchData && window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, hasMore, showingSearchData]);

    // If users reaches near the bottom of the page then this function calls the loadData API
    const handleScroll = () => {
        // Check if the user is near the bottom of the page
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (hasMore) {
                setLoader(true);
                // Added Timeout so that loading and fetching looks real
                setTimeout(() => {
                    loadData();
                }, 1000);
            }
        }
    };

    // This useEFfect is called whenever we apply filters or searching because they will change the urlSearchParams and then this useffect will gets called
    useEffect(() => {
        if (searchParams.get('search') || searchParams.get('genre') || searchParams.get('year') || searchParams.get('rating')) {
            setShowingSearchData(true);
        } else {
            setShowingSearchData(false);
        }
        let search = searchParams.get('search') ? searchParams.get('search') : "";
        let genre = searchParams.get('genre') ? searchParams.get('genre') : "please_choose";
        let year = searchParams.get('year') ? JSON.parse(searchParams.get('year') || "[0,0]") : [0, 0];
        let rating = searchParams.get('rating') ? searchParams.get('rating') : "0";
        let data = JSON.parse(JSON.stringify(movies));
        // Now we will check if any of the filter or searching is not at their default values because by default value we mean nothing is applied on filters yet.
        if (search != "") {
            data = movies.filter((movie: any) => movie.title.toLowerCase().includes(search?.toLowerCase()));
        }
        if (genre != 'please_choose') {
            let newData = data?.filter((movie: any) => movie.genre_ids.includes(parseInt(genre || '0')));
            data = newData;
        }
        if (year.filter((year: number) => year == 0)?.length < 2) {
            data = data?.filter((movie: any) => movie.release_date.split("-")[0] >= year[0] && movie.release_date.split("-")[0] <= year[1]);
        }
        if (rating != "0") {
            data = data?.filter((movie: any) => Math.round((movie.vote_average / 2)).toString() == rating);
        }
        setSearchData(data);
    }, [searchParams])

    return (
        <>
            {/* ----------------------Filter Drawer--------------------------- */}
            <Stack direction="row" justifyContent={'start'} alignItems={'center'}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <FilterAltIcon sx={{ mr: 1 }} />
                    <Typography>Filter</Typography>
                </IconButton>
            </Stack>

            <FilterDrawer
                key={'asd'}
                open={open}
                handleClose={handleDrawerClose}
                setShowingSearchData={setShowingSearchData}
            />
            {/* ----------------------Filter Drawer--------------------------- */}
            {/* ----------------------body--------------------------- */}
            <HomeMovieList
                initialLoader={initialLoader}
                hasMore={hasMore}
                loader={loader}
                movies={movies}
                search={searchParams.get('search') ? searchParams.get('search') : ""}
                searchData={searchData}
                wishlist_movies={wishlistMovies}
                setWishlistChanged={setWishlistChanged}
                showingSearchData={showingSearchData}
                setShowingSearchData={setShowingSearchData}
            />
            {/* ----------------------body--------------------------- */}
        </>
    )
}