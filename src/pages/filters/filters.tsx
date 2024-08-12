import DateRangeIcon from '@mui/icons-material/DateRange';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import StarIcon from '@mui/icons-material/Star';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, Drawer, FormControl, FormControlLabel, FormLabel, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Rating, Select, Slider, Stack, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import LoginIcon from '@mui/icons-material/Login';
import { useSearchParams } from 'react-router-dom';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function valuetext(value: number) {
    return `${value}`;
}

type Props = {
    open: boolean;
    handleClose: any;
    setShowingSearchData: any;
}
export const FilterDrawer = ({ open, handleClose, setShowingSearchData }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [genreList, setGenreList] = useState<any>([]);
    const [genre, setGenre] = useState<string>('please_choose');
    const [expanded, setExpanded] = useState<any>(false);
    const [year, setYear] = useState<number[]>([0, 0]);
    const [rating, setRating] = useState('0');
    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating((event.target as HTMLInputElement).value);
    };

    const handleYearChange = (event: Event, newValue: number | number[]) => {
        setYear(newValue as number[]);
    };

    const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        if (!genreList?.length) {
            const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';
            const genreOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTc1ODU2YTE4NjBhZWVkNzA0NmIxOTgxYTM2YmY1MiIsIm5iZiI6MTcyMzQwNTQzMi42MzkyNzYsInN1YiI6IjYwOTRlM2EzMWI3MjJjMDAzZGY4OTkzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ySDF1PXDoilCRA9pNvTHdNutg8mUJif7AcaeGhT5b8'
                }
            };

            fetch(genreUrl, genreOptions)
                .then(response => response.json())
                .then(data => {
                    const genre_list = data.genres; // This is an array of genres with id and name
                    setGenreList(genre_list);
                })
                .catch(error => console.error('Error fetching genres:', error));
        }
    }, []);

    const filterList = [
        {
            name: 'genre',
            label: 'Genre',
            icon: <MergeTypeIcon sx={{ color: 'whitesmoke', mr: 1 }} />,
            component: (
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{ color: 'whitesmoke' }}>Genre</InputLabel>
                    <Select fullWidth name='genre' placeholder='Select Genre...' label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <MenuItem key={'please_choose'} value="please_choose">Please choose a genre</MenuItem>
                        {
                            genreList?.map((gen: any) =>
                                <MenuItem key={gen.id} value={gen.id}>{gen.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            )
        },
        {
            name: 'release_year',
            label: 'Release Year',
            icon: <DateRangeIcon sx={{ color: 'whitesmoke', mr: 1 }} />,
            component: (
                <Stack direction={'row'}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={year}
                        min={1999}
                        max={2024}
                        onChange={handleYearChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Stack>
            )
        },
        {
            name: 'rating',
            label: 'Rating',
            icon: <StarIcon sx={{ color: 'whitesmoke', mr: 1 }} />,
            component: (
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={rating}
                        onChange={handleRatingChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label={<Rating name="half-rating" defaultValue={1} max={5} readOnly />} />
                        <FormControlLabel value="2" control={<Radio />} label={<Rating name="half-rating" defaultValue={2} max={5} readOnly />} />
                        <FormControlLabel value="3" control={<Radio />} label={<Rating name="half-rating" defaultValue={3} max={5} readOnly />} />
                        <FormControlLabel value="4" control={<Radio />} label={<Rating name="half-rating" defaultValue={4} max={5} readOnly />} />
                        <FormControlLabel value="5" control={<Radio />} label={<Rating name="half-rating" defaultValue={5} max={5} readOnly />} />
                    </RadioGroup>
                </FormControl>
            )
        },
    ];

    const resetFilters = () => {
        setRating('0');
        setYear([0,0]);
        setGenre('please_choose');
        searchParams.delete('genre');
        searchParams.delete('year');
        searchParams.delete('rating');
        setSearchParams(searchParams);
        handleClose();
        setShowingSearchData(false);
    }

    const applyFilters = () => {
        if(genre !== 'please_choose'){
            searchParams.set('genre', genre.toString());
        }else{
            searchParams.delete('genre');
        }
        if(year.filter((year: number) => year == 0)?.length < 2){
            searchParams.set('year', JSON.stringify(year));
        }else{
            searchParams.delete('year');
        }
        if(rating !== '0'){
            searchParams.set('rating', rating)
        }else{
            searchParams.delete('rating');
        }
        setSearchParams(searchParams);
        handleClose();
    }
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleClose}
        >
            <DrawerHeader>
            </DrawerHeader>
            <Divider />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} sx={{my: 2}}>
                    <Button size='small' color="inherit" variant='contained' endIcon={<RotateLeftIcon />} sx={{color: 'black'}} onClick={resetFilters}>Reset</Button>
                </Stack>
                <List>
                    {filterList.map((filter, index) => (
                        <>
                            <Accordion
                                key={`${filter.name}${index}`}
                                expanded={expanded === filter.name}
                                onChange={handleChange(filter.name)}
                                sx={{ my: 2 }}
                            >
                                <AccordionSummary
                                    key={`${filter.name}-header`}
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
                                    aria-controls={`${filter.name}${index}-content`}
                                    id={`${filter.name}-header`}
                                >
                                    {filter.icon}
                                    <Typography key={`${filter.name}${index}-header`}>{filter.label}</Typography>
                                </AccordionSummary>
                                <AccordionDetails key={`${filter.name}${index + 15000}-header`}>
                                    {filter.component}
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ))}
                </List>
                <Stack direction={'row'} spacing={2} sx={{ marginTop: 'auto', paddingBottom: '10px' }}>
                    <Button size='small' color='warning' variant='contained' endIcon={<DoDisturbIcon />} onClick={handleClose}>Cancel</Button>
                    <Button size='small' color='secondary' variant='contained' endIcon={<LoginIcon />} onClick={applyFilters}>Apply</Button>
                </Stack>
            </Container>
        </Drawer>
    )
}