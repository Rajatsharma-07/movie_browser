import React from "react";
import { Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
    initialLoader: boolean;
    search?: string | null;
    movies: any;
    searchData: any;
    setWishlistChanged: any
}
export const WishlistMovieList = ({ initialLoader, movies, search, searchData, setWishlistChanged }: Props) => {
    // This is the base URL which in which we will append the image name fetched from the api, So that we can show the image on our UI. 
    const baseURL = 'https://image.tmdb.org/t/p/w200';
    // This function is responsible for removing movie from the wishlist.
    const handleRemoveFromWishlist = (movie_id: string) => {
        let wishilistMovies = JSON.parse(JSON.stringify(movies))?.filter((movie: any) => movie?.id != movie_id);
        localStorage.setItem('wishlist', JSON.stringify(wishilistMovies));
        setWishlistChanged(true);
    }
    return (
        <React.Fragment>
            {/* This is the initial loader part which will render whenever we try to access the wishlist page for the first time.(By default I have added the timeout functionality so that it looks real).*/}
            {initialLoader && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress color="secondary" />
                    <Typography variant="caption" color={'purple'}>Please wait we are working our charm.</Typography>
                </Stack>
            </div>}
            <Grid container spacing={2}>
                {!initialLoader && search !== "" && searchData?.length == 0 ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>No Result found</div> : 
                !initialLoader &&  movies?.length == 0 ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>No Result found</div> :
                !initialLoader && (search === "" ? movies : searchData)?.map((movie: any) => (
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
                                    <FavoriteIcon sx={{color: 'red'}} onClick={() => handleRemoveFromWishlist(movie?.id)} />
                                </div>
                                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                                    {`${movie?.title} (${movie?.release_date.split("-")[0]})`}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}