import CardMedia from '@mui/material/CardMedia';
import { Col, Row } from 'react-bootstrap';
import { AiFillPlayCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFavourites, addPlayer, removeFavourites } from '../redux/actions/actions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

export default function ActionAreaCard(props) {
    const favourites = useSelector(state => state.favorites.favorites)
    const [toggleGad, setToggleGad] = useState(false)


    const checkFavourites = (arr) => {
        return arr.some((item) => item.id === props.card.id)
    }

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const cutString = (string) => {
        let arr = string.split('');
        let stringCutted = arr.slice(0, 16);
        stringCutted.unshift('"')
        stringCutted.push('..."')
        return stringCutted.join('');
    }
    return (
        <Col className='p-3 text-center m-2'>
            <Row
                onMouseEnter={() => setTimeout(() => { setToggleGad(true) }, 100)}
                onMouseLeave={() => setTimeout(() => { setToggleGad(false) }, 300)}
                style={{
                    boxShadow: checkFavourites(favourites) ? '2px 2px 20px green' : '2px 2px 20px black'
                }}
                className='d-flex flex-column justify-content-between align-items-center cardMusic p-1 pt-2' >
                {
                    toggleGad && (
                        <Col className='d-flex justify-content-end' xs={12}>
                            <button
                                onClick={() => {
                                    if (checkFavourites(favourites)) {
                                        dispatch(removeFavourites(props.card))
                                    } else {
                                        dispatch(addFavourites(props.card))
                                    }

                                }}
                                className='favouriteIcon'>
                                {
                                    checkFavourites(favourites) ? (
                                        <FavoriteIcon className='favouriteHeart text-danger' />
                                    ) : <FavoriteBorderIcon className='favouriteHeart text-danger' />
                                }

                            </button>
                        </Col>
                    )
                }
                <Col>
                    <CardMedia
                        className='imgCard'
                        component="img"
                        image={props.card.album.cover_xl}
                        alt="green iguana"
                        sx={{
                            maxWidth: '300px',
                            marginBottom: '10px',
                        }}
                    />
                </Col>

                {
                    toggleGad && (
                        <Col className='d-flex flex-column justify-content-between'>
                            <button onClick={() => navigate('/album/' + props.card.album.id)} className='m-0 my-3 textCard p-0'>Album: {cutString(props.card.album.title)}</button>
                            <button onClick={() => navigate('/artist/' + props.card.artist.id)} className='m-0 my-3 textCard text-center p-0'>Artist: {props.card.artist.name}</button>
                        </Col>
                    )
                }

                <Col className='d-flex flex-column justify-content-end'>
                    <p className='m-0 textCard2 text-center my-3'>Song: {props.card.title}</p>
                    {
                        toggleGad && (
                            <Col className='mt-2 d-flex justify-content-center' xs={12} >
                                <button
                                    className='playButton'
                                    onClick={() => {
                                        dispatch(addPlayer(props.card))
                                    }}>
                                    <AiFillPlayCircle />
                                </button>
                            </Col>
                        )
                    }
                </Col>


            </Row>
        </Col>

    );
}
