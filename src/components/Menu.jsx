import { useLocation, useNavigate } from "react-router-dom"
import { Col } from "react-bootstrap"
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SvgIcon from '@mui/material/SvgIcon';
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react";
import { addArtist, resetArtist } from "../redux/actions/actions";
import { useDispatch } from "react-redux";


const Menu = () => {
    const [searchToggle, setSearchToggle] = useState(true)
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')
    const [headers] = useState({
        // sets the headers
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
    })
    const navigate = useNavigate()

    const dispatch = useDispatch()

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
        <Col className="d-flex flex-column align-items-start text-center d-md-none mt-1">
            <Col>
                <button
                    onClick={() => {
                        navigate('/')
                    }} className="mb-3 homeMenuLink"><HomeIcon style={{
                        boxShadow: location.pathname === '/' ? '0px 0px 10px green' : '0px 0px 10px transparent',
                        borderRadius: '10px',
                    }} sx={{ fontSize: '2rem' }} color='gray' /></button>

            </Col>
            <Col  >
                <button onClick={() => {
                    navigate('/favourites')
                }} className="homeMenuLink"><LocalLibraryIcon style={{
                    boxShadow: location.pathname === '/favourites' ? '0px 0px 10px green' : '0px 0px 10px transparent',
                    borderRadius: '10px',
                }} sx={{ fontSize: '2rem' }} /></button>
            </Col>
            {
                location.pathname === '/' && (
                    <Col className="d-flex flex-column flex-sm-row mt-1">
                        <button onClick={() => {
                            setSearchToggle(!searchToggle)
                        }} className={!searchToggle ? "homeMenuLink text-danger" : "homeMenuLink"}><SearchIcon sx={{ fontSize: '2rem' }} /></button>


                    </Col>
                )
            }
            {
                location.pathname === '/' && (
                    <>
                        {
                            !searchToggle && (
                                <input
                                    type="text"
                                    style={{
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
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
                            )
                        }
                    </>

                )
            }


        </Col>
    )
}

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

export default Menu