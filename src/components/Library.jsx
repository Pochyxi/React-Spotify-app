import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import ActionAreaCard from "./Card"
import Menu from "./Menu"


const Library = () => {

    const favourites = useSelector(state => state.favorites.favorites)

    const choseImg = (arr) => {
        return favourites[Math.floor(Math.random() * arr.length)]
    }

    return (
        <Container fluid className="MyHome text-light text-start pb-5 mb-5">
            <Row>
                <Col
                    xs={12}
                    className='p-3 coverArtist d-flex flex-column justify-content-end'
                    style={{ backgroundImage: 'url(' + choseImg(favourites).album.cover_xl + ')' }}>
                </Col>
                <Menu />
            </Row>
            <Row className="py-5">
                <h1>Your Favourite music</h1>
                <Col xs={12} className='text-secondary d-flex mySection flex-wrap justify-content-start pe-5 text-light'>

                    {
                        favourites.map(card => (
                            <Col key={card.id} xs={6} md={6} lg={4} xxl={3} >
                                <ActionAreaCard card={card} />
                            </Col>
                        ))
                    }
                </Col>
            </Row>
        </Container >
    )
}

export default Library
