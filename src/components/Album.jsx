import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addPlayer, setAlbumSection } from "../redux/actions/actions"
import CardMedia from '@mui/material/CardMedia';
import Menu from "./Menu"


const Album = () => {
    const params = useParams()
    const albumSongs = useSelector(state => state.music.album)
    const [headers] = useState({
        // sets the headers
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        search()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const search = async () => {
        try {
            let response = await fetch(
                'https://striveschool-api.herokuapp.com/api/deezer/album/' +
                params.albumId,
                {
                    method: 'GET',
                    headers,
                }
            )

            if (response.ok) {
                let result = await response.json()
                dispatch(setAlbumSection(result))

            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container fluid className="MyHome text-light pb-5 mb-5 mt-4">
            <Row className="py-4 homeMenu text-center d-flex flex-wrap justify-content-between justify-content-md-center">
                <Menu />
            </Row>
            {
                albumSongs.title && (
                    <Row>
                        <Col md={4} className='d-flex flex-column justify-content-center align-items-center justify-content-md-start'>
                            <CardMedia
                                className='imgCard'
                                component="img"
                                image={albumSongs.cover_xl}
                                alt="green iguana"
                                sx={{
                                    maxWidth: '300px',
                                    marginBottom: '10px',
                                    '&:hover': { filter: 'brightness(50%)' }
                                }}
                            />
                            <p className='m-0 albumTitle  text-center p-0'>{albumSongs.title}</p>
                            <button
                                className='m-0 albumArtist  text-center p-0'
                                onClick={() => navigate('/artist/' + albumSongs.artist.id)}>{albumSongs.artist.name}</button>
                        </Col>
                        <Col md={7} className='pb-5'>
                            {
                                albumSongs.tracks.data.map(song => (

                                    <Col onClick={
                                        () => {
                                            dispatch(addPlayer(song))
                                        }
                                    } key={song.id} xs={12} className='d-flex justify-content-between my-3 albumSongNameDuration'>
                                        <button className="albumSongName">{song.title_short}</button>
                                        <button className="albumSongDuration">{formatDuration(song.duration)}</button>
                                    </Col>


                                ))
                            }
                        </Col>
                    </Row>
                )

            }


        </Container>
    )
}

export default Album