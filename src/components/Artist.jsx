import { useEffect } from "react"
import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setArtistSection, setTracks } from "../redux/actions/actions"
import ActionAreaCard from "./Card"
import Menu from "./Menu"


const Artist = () => {

    const params = useParams()
    const artist = useSelector(state => state.music.artist)
    const tracks = useSelector(state => state.music.tracks)
    const [headers] = useState({
        // sets the headers
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
    })

    const dispatch = useDispatch()

    useEffect(() => {
        search()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        searchTracks(artist.name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist])

    const filterTracks = (arr) => {
        return arr.filter(track => track.artist.name === artist.name)
    }

    const search = async () => {
        try {
            let response = await fetch(
                'https://striveschool-api.herokuapp.com/api/deezer/artist/' +
                params.artistId,
                {
                    method: 'GET',
                    headers,
                }
            ) // gets the information

            if (response.ok) {
                let result = await response.json() // transforms the response to json
                dispatch(setArtistSection(result))
            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const searchTracks = async (data) => {
        try {
            let response = await fetch(
                'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
                data,
                {
                    method: 'GET',
                    headers,
                }
            ) // gets the information

            if (response.ok) {
                let result = await response.json() // transforms the response to json

                dispatch(setTracks(result.data))

            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container fluid className="MyHome text-light text-start pb-5 mb-5">
            {
                artist.id && (
                    <>
                        <Row>
                            <Col
                                xs={12}
                                className='p-3 coverArtist d-flex flex-column justify-content-end'
                                style={{ backgroundImage: 'url(' + artist.picture_xl + ')' }}>
                                <p className="artistArtistName">{artist.name}</p>
                                <p className="artistArtistFollowers">Followers: {artist.nb_fan}</p>
                            </Col>
                            <Menu />
                        </Row>
                        {
                            tracks.length > 0 && (
                                <Row className="py-5">
                                    <h1>Top tracks</h1>
                                    <Col xs={12} className='text-secondary d-flex mySection flex-wrap justify-content-start pe-5 text-light'>

                                        {
                                            filterTracks(tracks).map(card => (
                                                <Col key={card.id} xs={6} md={6} lg={4} xxl={3} >
                                                    <ActionAreaCard card={card} />
                                                </Col>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            )
                        }

                    </>

                )
            }

        </Container >
    )
}

export default Artist