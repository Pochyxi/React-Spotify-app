import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import { useSelector } from 'react-redux';


const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : '#1e1e1e66',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});


export default function MusicPlayerSlider() {

    const music = useSelector(state => state.music.musicPlayer)
    const theme = useTheme();



    const duration = music.duration; // seconds

    const [paused, setPaused] = React.useState(true);
    const [url, setUrl] = React.useState('https://cdns-preview-7.dzcdn.net/stream/c-7347e9b2b7eb3157b9fd696d01dcb0b5-7.mp3')
    const [audioTime, setAudioTime] = React.useState(null)
    // eslint-disable-next-line no-unused-vars
    const [audioVolume, setAudioVolume] = React.useState(null)
    const [int, setInt] = React.useState('x')
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }



    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';

    React.useEffect(() => {
        setUrl(music.preview)
        setAudioTime(document.getElementById("s/0/0").currentTime)
        setAudioVolume(document.getElementById("s/0/0").volume)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    React.useEffect(() => {
        setUrl(music.preview)
        setPaused(true)
    }, [music])


    // console.log(audioVolume)
    return (
        <>
            <audio className="playSong" id="s/0/0" src={url}></audio>
            {
                music.album ? (
                    <Widget className=' d-flex justify-content-between playerMusic text-light'>

                        <Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                            <CoverImage>
                                <img
                                    alt="can't win - Chilling Sunday"
                                    src={music.album.cover_medium}
                                />
                            </CoverImage>
                            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                                <Typography variant="caption" color="green" fontWeight={500}>
                                    {music.artist.name}
                                </Typography>
                                <Typography noWrap>
                                    <b>{music.album.title}</b>
                                </Typography>
                                <Typography noWrap letterSpacing={-0.25}>
                                    {music.title}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: '40%' }} className='d-flex flex-column'>
                            <Slider
                                aria-label="time-indicator"
                                size="small"
                                value={Math.floor(audioTime)}
                                min={0}
                                step={1}
                                max={duration}
                                // onChange={(_, value) => setPosition(value)}
                                sx={{
                                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                    height: 4,
                                    '& .MuiSlider-thumb': {
                                        width: 8,
                                        height: 8,
                                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                        '&:before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                                ? 'rgb(255 255 255 / 16%)'
                                                : 'rgb(0 0 0 / 16%)'
                                                }`,
                                        },
                                        '&.Mui-active': {
                                            width: 20,
                                            height: 20,
                                        },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.28,
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: -2,
                                }}
                            >
                                <TinyText className='mt-1'>{formatDuration(Math.floor(audioTime))}</TinyText>
                                <TinyText className='mt-1'>-{formatDuration(music.duration - Math.floor(audioTime))}</TinyText>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: -1,
                                }}
                            >
                                <IconButton onClick={() => {
                                    let audio = document.getElementById('s/0/0')
                                    audio.currentTime = 0
                                }} aria-label="previous song">
                                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                                <IconButton
                                    aria-label={paused ? 'play' : 'pause'}
                                    onClick={() => {
                                        let audio = document.getElementById('s/0/0')
                                        if (paused) {
                                            setPaused(!paused)
                                            audio.play();
                                            setInt(setInterval(() => {
                                                setAudioTime(audio.currentTime)
                                            }, 500))
                                            console.log(audio.on)
                                        } else {
                                            clearInterval(int)
                                            audio.pause();
                                            setPaused(!paused)
                                        }
                                    }}
                                >
                                    {paused ? (
                                        <PlayArrowRounded
                                            sx={{ fontSize: '3rem' }}
                                            htmlColor={mainIconColor}
                                        />
                                    ) : (
                                        <PauseRounded
                                            sx={{ fontSize: '3rem' }}
                                            htmlColor={mainIconColor} />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song">
                                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Widget>
                ) : (
                    <Widget className=' d-flex justify-content-between playerMusic'>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                            <CoverImage>
                            </CoverImage>
                            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                    {''}
                                </Typography>
                                <Typography noWrap>
                                    <b>{''}</b>
                                </Typography>
                                <Typography noWrap letterSpacing={-0.25}>
                                    {''}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: '30%' }} className='d-flex flex-column'>
                            <Slider
                                aria-label="time-indicator"
                                size="small"
                                value={Math.floor(audioTime)}
                                min={0}
                                step={1}
                                max={duration}
                                // onChange={(_, value) => setPosition(value)}
                                sx={{
                                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                    height: 4,
                                    '& .MuiSlider-thumb': {
                                        width: 8,
                                        height: 8,
                                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                        '&:before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                                ? 'rgb(255 255 255 / 16%)'
                                                : 'rgb(0 0 0 / 16%)'
                                                }`,
                                        },
                                        '&.Mui-active': {
                                            width: 20,
                                            height: 20,
                                        },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.28,
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: -2,
                                }}
                            >
                                <TinyText className='mt-1'>{''}</TinyText>
                                <TinyText className='mt-1'>-{''}</TinyText>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: -1,
                                }}
                            >
                                <IconButton aria-label="previous song">
                                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                                <IconButton
                                    aria-label={paused ? 'play' : 'pause'}
                                >
                                    {paused ? (
                                        <PlayArrowRounded
                                            sx={{ fontSize: '3rem' }}
                                            htmlColor={mainIconColor}
                                        />
                                    ) : (
                                        <PauseRounded
                                            sx={{ fontSize: '3rem' }}
                                            htmlColor={mainIconColor} />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song">
                                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                            </Box>

                        </Box>
                        <Box sx={{ width: '30%' }}>
                        </Box>
                    </Widget>
                )
            }

        </>

    );
}
