import { useEffect } from "react"
import { useState } from "react"
import { Col, Row, Container } from "react-bootstrap"
import ActionAreaCard from "./Card"
import { useSelector } from "react-redux";
import Menu from "./Menu";

const rockArtists = [
    'queen',
    'u2',
    'thepolice',
    'eagles',
    'thedoors',
    'oasis',
    'thewho',
    'bonjovi',
]

const popArtists = [
    'maroon5',
    'coldplay',
    'onerepublic',
    'jamesblunt',
    'katyperry',
    'arianagrande',
]

const hipHopArtists = [
    'eminem',
    'snoopdogg',
    'lilwayne',
    'drake',
    'kanyewest',
]


const MyHome = () => {

    const musicContent = useSelector(state => state.music.content)

    const [rock, setRock] = useState({
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
    })
    const [pop, setPop] = useState({
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
    })
    const [hipHop, setHipPop] = useState({
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
    })
    const [headers] = useState({
        // sets the headers
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
    })

    useEffect(() => {
        handleFetch(getRandomArtists().rock, 0)
        handleFetch(getRandomArtists().pop, 1)
        handleFetch(getRandomArtists().hipHop, 2)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const stabilityCheck = () => {
        let check = false
        if (rock.arr1.length > 0 &&
            rock.arr2.length > 0 &&
            rock.arr3.length > 0 &&
            rock.arr4.length > 0 &&
            pop.arr1.length > 0 &&
            pop.arr2.length > 0 &&
            pop.arr3.length > 0 &&
            pop.arr4.length > 0 &&
            hipHop.arr1.length > 0 &&
            hipHop.arr2.length > 0 &&
            hipHop.arr3.length > 0 &&
            hipHop.arr4.length > 0) {
            check = true
        }
        return check
    }
    const handleFetch = (arr, n) => {
        for (let i = 0; i < arr.length; i++) {
            handleArtist(arr[i], n, i)
        }
    }
    const generatorSections = (obj) => {
        let generatedArray = []
        generatedArray.push(obj.arr1[Math.floor(Math.random() * obj.arr1.length)])
        generatedArray.push(obj.arr2[Math.floor(Math.random() * obj.arr2.length)])
        generatedArray.push(obj.arr3[Math.floor(Math.random() * obj.arr3.length)])
        generatedArray.push(obj.arr4[Math.floor(Math.random() * obj.arr4.length)])

        return generatedArray
    }
    const getRandomArtists = () => {
        let artistRock = rockArtists
        let artistPop = popArtists
        let artistHipHop = hipHopArtists

        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                for (let i = 0; i < 4; i++) {
                    let randomElement = artistRock[Math.floor(Math.random() * artistRock.length)]
                    artistRock = artistRock.filter(item => item !== randomElement)
                }
            } else if (i === 1) {
                for (let i = 0; i < 2; i++) {
                    let randomElement = artistPop[Math.floor(Math.random() * artistPop.length)]
                    artistPop = artistPop.filter(item => item !== randomElement)
                }
            } else if (i === 2) {
                for (let i = 0; i < 1; i++) {
                    let randomElement = artistHipHop[Math.floor(Math.random() * artistHipHop.length)]
                    artistHipHop = artistHipHop.filter(item => item !== randomElement)
                }
            }
        }

        let obj = {
            rock: artistRock,
            pop: artistPop,
            hipHop: artistHipHop,
        }
        return obj
    }



    const handleArtist = async (artistName, n, i) => {

        try {
            let response = await fetch(
                'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
                artistName,
                {
                    method: 'GET',
                    headers,
                }
            )
            if (response.ok) {
                let result = await response.json()
                let songInfo = result.data

                if (n === 0) {
                    if (i === 0) {
                        setRock(rock => {
                            return {
                                ...rock,
                                arr1: songInfo
                            }
                        })
                    } else if (i === 1) {
                        setRock(rock => {
                            return {
                                ...rock,
                                arr2: songInfo
                            }
                        })
                    } else if (i === 2) {
                        setRock(rock => {
                            return {
                                ...rock,
                                arr3: songInfo
                            }
                        })
                    } else if (i === 3) {
                        setRock(rock => {
                            return {
                                ...rock,
                                arr4: songInfo
                            }
                        })
                    }
                } else if (n === 1) {
                    if (i === 0) {
                        setPop(pop => {
                            return {
                                ...pop,
                                arr1: songInfo
                            }
                        })
                    } else if (i === 1) {
                        setPop(pop => {
                            return {
                                ...pop,
                                arr2: songInfo
                            }
                        })
                    } else if (i === 2) {
                        setPop(pop => {
                            return {
                                ...pop,
                                arr3: songInfo
                            }
                        })
                    } else if (i === 3) {
                        setPop(pop => {
                            return {
                                ...pop,
                                arr4: songInfo
                            }
                        })
                    }
                } else if (n === 2) {
                    if (i === 0) {
                        setHipPop(pop => {
                            return {
                                ...pop,
                                arr1: songInfo
                            }
                        })
                    } else if (i === 1) {
                        setHipPop(pop => {
                            return {
                                ...pop,
                                arr2: songInfo
                            }
                        })
                    } else if (i === 2) {
                        setHipPop(pop => {
                            return {
                                ...pop,
                                arr3: songInfo
                            }
                        })
                    } else if (i === 3) {
                        setHipPop(pop => {
                            return {
                                ...pop,
                                arr4: songInfo
                            }
                        })
                    }
                }

            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err)
        }
    }
    // console.log('rock here')
    // console.log(rock)
    // console.log('pop here')
    // console.log(pop)
    // console.log('Hippop here')
    // console.log(hipHop)
    // console.log('and generatedArray')
    // console.log(generatorSections(rock))
    // console.log(stabilityCheck())
    // console.log(musicContent)


    return (
        <Container fluid className="MyHome text-light text-start pb-5 mb-5">
            <Row className="py-4 homeMenu text-center d-flex flex-wrap justify-content-between justify-content-md-center">
                <Menu />
                <Col className="d-md-flex justify-content-between">
                    <Col className='mb-2 m-md-0' xs={12} md={2}><a className="homeMenuLink " href="/#">TRENDING</a></Col>
                    <Col className='mb-2 m-md-0' xs={12} md={2}><a className="homeMenuLink " href="/#"> PODCAST</a></Col>
                    <Col className='mb-2 m-md-0' xs={12} md={2}><a className="homeMenuLink " href="/#">MOODS AND GENRES</a></Col>
                    <Col className='mb-2 m-md-0' xs={12} md={2}><a className="homeMenuLink " href="/#">NEW RELEASE</a></Col>
                    <Col className='mb-2 m-md-0' xs={12} md={2}><a className="homeMenuLink " href="/#">DISCOVER</a></Col>
                </Col>

            </Row>
            {
                musicContent.length > 0 && (
                    <Row className="mb-5 mt-5">
                        <h1>Results</h1>
                        <Col xs={12} className='text-secondary d-flex mySection flex-wrap justify-content-start text-light'>

                            {
                                musicContent.map(card => (
                                    card.map(artist => (
                                        <Col key={artist.id} xs={6} md={6} lg={4} xxl={3} >
                                            <ActionAreaCard key={card.id} card={artist} />
                                        </Col>
                                    ))

                                ))
                            }
                        </Col>
                    </Row>
                )
            }

            <Row className="mb-5 mt-5">
                <h1>Rock Classics</h1>
                <Col xs={12} className='text-secondary d-flex mySection flex-wrap justify-content-start text-light'>

                    {
                        stabilityCheck() && (
                            generatorSections(rock).map(card => (
                                <Col key={card.id} xs={6} md={6} lg={4} xxl={3} >
                                    <ActionAreaCard card={card} />
                                </Col>

                            ))
                        )
                    }
                </Col>
            </Row>
            <Row className="mb-5 mt-5">
                <h1>Pop Culture</h1>
                <Col xs={12} className='text-secondary d-flex mySection flex-wrap justify-content-start  text-light'>
                    {
                        stabilityCheck() && (
                            generatorSections(pop).map(card => (
                                <Col key={card.id} xs={6} md={6} lg={4} xxl={3} >
                                    <ActionAreaCard card={card} />
                                </Col>

                            ))
                        )
                    }
                </Col>
            </Row>
            <Row className="mb-5 mt-5">
                <h1>#HipHop</h1>
                <Col xs={12} className='text-secondary d-flex mySection flex-wrap justify-content-start text-light'>
                    {
                        stabilityCheck() && (
                            generatorSections(hipHop).map((card) => (
                                <Col key={card.id} xs={6} md={6} lg={4} xxl={3} >
                                    <ActionAreaCard card={card} />
                                </Col>

                            ))
                        )
                    }
                </Col>
            </Row>
        </Container >

    )
}


export default MyHome