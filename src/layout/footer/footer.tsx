import { Container, Grid, Typography } from '@mui/material';

export const Footer = () => {
    const ICONS = [
        {
            key: '1',
            name: 'Facebook',
            path: '/assets/icons/facebook.png'
        },
        {
            key: '2',
            name: 'Instagram',
            path: '/assets/icons/instagram.png'
        },
        {
            key: '3',
            name: 'Twitter',
            path: '/assets/icons/twitter.png'
        },
        {
            key: '4',
            name: 'Twitch',
            path: '/assets/icons/twitch.png'
        },
        {
            key: '5',
            name: 'Youtube',
            path: '/assets/icons/youtube.png'
        },
    ];

    const CONTENT = [
        {
            key: '1',
            title: 'Privacy Policy',
            description: 'Privacy Policy'
        },
        {
            key: '2',
            title: 'Contact Us',
            description: 'Contact Us'
        },
        {
            key: '3',
            title: 'Cookie Preferences',
            description: 'Cookie Preferences'
        },
        {
            key: '4',
            title: 'Corporate Information',
            description: 'Corporate Information'
        },
        {
            key: '5',
            title: 'Privacy Policy',
            description: 'Privacy Policy'
        },
        {
            key: '6',
            title: 'Contact Us',
            description: 'Contact Us'
        },
        {
            key: '7',
            title: 'Cookie Preferences',
            description: 'Cookie Preferences'
        },
        {
            key: '8',
            title: 'Corporate Information',
            description: 'Corporate Information'
        },
    ];
    return (
        <Container maxWidth='lg' sx={{background: 'black' }}>
            <Grid container sx={{ mb: 4, mt: 8 }}>
            </Grid>
            <Grid container sx={{my: 7}}>
                {CONTENT?.map((content) =>
                    <Grid key={content.key} item xs={6} sm={3}>
                        <Typography variant='body1'>
                            {content.title}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}