import React from "react";
import { Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSearchParams } from "react-router-dom";

type Props = {
    initialLoader: boolean;
    search?: string | null;
    movies: any;
    searchData: any;
    loader: boolean;
    hasMore: boolean;
    wishlist_movies: any;
    setWishlistChanged: any;
    showingSearchData: boolean;
    setShowingSearchData: any
}
export const HomeMovieList = ({ initialLoader, loader, movies, search, searchData, hasMore, wishlist_movies, setWishlistChanged, showingSearchData, setShowingSearchData }: Props) => {
    const baseURL = 'https://image.tmdb.org/t/p/w200';
    const [searchParams, setSearchParams] = useSearchParams();
    const handleRemoveFromWishlist = (movie_id: string) => {
        let wishilistMovies = JSON.parse(JSON.stringify(wishlist_movies))?.filter((movie: any) => movie?.id != movie_id);
        localStorage.setItem('wishlist', JSON.stringify(wishilistMovies));
        setWishlistChanged(true);
    }
    const handleAddInWishlist = (movie: any) => {
        let wishilistMovies = JSON.parse(JSON.stringify(wishlist_movies));
        wishilistMovies?.push(movie);
        localStorage.setItem('wishlist', JSON.stringify(wishilistMovies));
        setWishlistChanged(true);
    }
    return (
        <React.Fragment>
            {initialLoader && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress color="secondary" />
                    <Typography variant="caption" color={'purple'}>Please wait we are working our charm.</Typography>
                </Stack>
            </div>}
            <Grid container spacing={2}>
                {!initialLoader && showingSearchData && searchData?.length == 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>No Result found</div> :
                    !initialLoader && movies?.length == 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>No Result found</div> :
                        (!showingSearchData ? movies : searchData)?.map((movie: any) => (
                            <Grid item xs={12} sm={6} md={3} lg={2.4} key={movie.id}>
                                <Card className="zoom-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <img
                                            className="zoom-image"
                                            src={`${baseURL}${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ height: '320px' }} // Fixed height for image
                                        />
                                        <div className="heart-icon">
                                            {(wishlist_movies || [])?.find((wishist_movie: any) => wishist_movie?.id == movie?.id) ? <FavoriteIcon sx={{ color: 'red' }} onClick={() => handleRemoveFromWishlist(movie?.id)} /> : <FavoriteBorderIcon onClick={() => handleAddInWishlist(movie)} />}
                                        </div>
                                        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                                            {`${movie?.title} (${movie?.release_date.split("-")[0]})`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
            </Grid>
            {loader && hasMore && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress color="secondary" />
                    <Typography variant="caption" color={'purple'}>Please wait we are working our charm.</Typography>
                </Stack>
            </div>}
        </React.Fragment>
    )
}