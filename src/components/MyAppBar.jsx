import { Col } from "react-bootstrap"
import SvgIcon from '@mui/material/SvgIcon';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { BsSpotify } from 'react-icons/bs'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addArtist, resetArtist } from "../redux/actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
const MyAppBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [headers] = useState({
        // sets the headers
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
    })
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const location = useLocation()

    const search = async () => {
        try {
            let response = await fetch(
                'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
                searchQuery,
                {
                    method: 'GET',
                    headers,
                }
            ) // gets the information

            if (response.ok) {
                let result = await response.json() // transforms the response to json
                let songs = result.data // gets the songs info
                dispatch(addArtist(songs))

            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Col xs={3} className='text-secondary MyAppBar2 px-sm-4  flex-column d-none d-md-flex'>
            </Col>
            <Col xs={3} className='text-secondary MyAppBar px-sm-4  flex-column d-none d-md-flex'>
                <Col style={{ height: '75%' }} xs={12} className='text-center mt-5'>
                    <h4 className="text-light text-start"><BsSpotify style={{ fontSize: '2.5rem' }} /> Spotify</h4>
                    <Col xs={12} className='text-start mt-5 d-flex flex-column'>
                        <button
                            onClick={() => {
                                navigate('/')
                            }} className={location.pathname === '/' ? "mb-3 homeMenuLink2 whiteText" : "mb-3 homeMenuLink2"}><HomeIcon sx={{ fontSize: '1.2em' }} color='gray' /> Home</button>
                        <button onClick={() => {
                            navigate('/favourites')
                        }} className={location.pathname === '/favourites' ? "homeMenuLink2 whiteText" : "homeMenuLink2"}><LocalLibraryIcon sx={{ fontSize: '1.2em' }} /> Your Library</button>
                    </Col>
                    {
                        location.pathname === '/' && (
                            <div className="input-group mt-3 d-flex align-items-center justify-content-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        if (e.target.value.length > 2) {
                                            search()
                                        }

                                        if (e.target.value.length < 2) {
                                            dispatch(resetArtist())
                                        }
                                    }}
                                    className="form-control mb-0"
                                    id="searchField"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <div
                                    className="input-group-append"
                                >
                                </div>
                            </div>
                        )
                    }

                </Col>
            </Col>
        </>

    )
}

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

export default MyAppBar