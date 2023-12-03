import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import Filter from '../form/Search.jsx'
import { useDataStore } from '../stores/DataStore.js'

const Header = ({ categories, page_title }) => {
  const setType = useDataStore((state) => state.setType)
  // const token = useAuthStore((state) => state.token)
  const setFilter = useDataStore((state) => state.setFilter)
  const [title, setTitle] = useState(page_title)

  const handleCategoriesChange = useCallback((event) => {
    let index = event.target.selectedIndex
    setTitle(event.target[index].text)
    if (event.target.value) {
      setFilter('')
    }
    setType(event.target.value)
  }, [])

  // const API_URL = 'https://cors-anywhere.herokuapp.com/'
  // const [apiKey, setApiKey] = useState('')
  // const [show, setShow] = useState(false)
  // const [disable, setDisable] = useState(true)
  // const [game, setGame] = useState({
  //   center_id: '',
  //   name: '',
  //   summary: '',
  //   poster: '',
  //   screenshots: '',
  //   videos: '',
  //   executable: '',
  //   parameters: '',
  //   game_type: '',
  //   type: ''
  // })
  // const Api = new GameAPI(token)

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)
  // const sortedCategories = categories?.sort((a, b) => a.description.localeCompare(b.description))
  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   event.stopPropagation()

  //   // console.log(game)
  //   const response = await Api.addGame(game)
  //   console.log(response)
  //   if (response.status === 201) {
  //     setShow(false)
  //     setGame([])
  //   }
  // }
  // useEffect(() => {
  //   window.showButton = () => {
  //     const button = document.getElementById('GameModal')
  //     button.style.display = 'block'
  //   }
  // }, [])

  // const getApiKey = async (client_id, client_secret) => {
  //   const response = await fetch(
  //     `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
  //     {
  //       method: 'POST'
  //     }
  //   )
  //   const data = await response.json()
  //   setApiKey(data.token)
  //   return data.token
  // }
  // useEffect(() => {
  //   async function getKey() {
  //     const key = await getApiKey(
  //       'sz4fdut3dwthuoryprilvj8ce5fvg8',
  //       'l56dya21c4u40vkjnvrvol1rttxfj3'
  //     )
  //     return () => {
  //       setApiKey(key)
  //     }
  //   }
  //   getKey()
  // }, [])
  // const fetchData = async (gameName, apiKey) => {
  //   setGame({ ...game, name: gameName })
  //   console.log(apiKey)
  //   // Wait for response
  //   const response = await fetch(API_URL + `https://api.igdb.com/v4/games`, {
  //     method: 'POST',
  //     headers: {
  //       'Client-ID': 'sz4fdut3dwthuoryprilvj8ce5fvg8',
  //       Authorization: `Bearer ${apiKey}`,
  //       'Content-Type': 'text/plain'
  //     },
  //     body: `fields name,summary,cover.*,screenshots.*,videos.*'; search "${gameName}"; where version_parent = null;`
  //   })

  //   const games = await response.json()
  //   const center_id = JSON.parse(localStorage.getItem('session')).center_id
  //   console.log(center_id)
  //   // console.log(games)
  //   if (games.length > 0) {
  //     setGame({
  //       center_id: center_id,
  //       name: games[0].name,
  //       summary: games[0].summary ?? '',
  //       poster: `https:${games[0].cover?.url.replace('t_thumb', 't_cover_big')}`,
  //       screenshots: JSON.stringify(
  //         games[0].screenshots?.map(
  //           (screenshot) => `https:${screenshot.url.replace('t_thumb', 't_screenshot_big')}`
  //         )
  //       ),
  //       videos: JSON.stringify(
  //         games[0].videos?.map((video) => `https://www.youtube.com/embed/${video.video_id}`)
  //       ),
  //       type: 'games'
  //     })
  //   }
  // }
  // const handleCategoryOnChange = useCallback((category) => {
  //   if (category !== 'offline' || category !== 'wargaming') {
  //     setDisable(false)
  //   }
  //   console.log(disable)
  //   setDisable(true)
  // })

  // const handleSelectExecutable = useCallback(async () => {
  //   try {
  //     const selectedFilePath = await window.api.selectExecutable()
  //     if (selectedFilePath) {
  //       setGame((game) => ({
  //         ...game,
  //         executable: selectedFilePath.executable,
  //         parameters: selectedFilePath.parameters
  //       }))
  //     } else {
  //       setNotifications('File dialog was cancelled')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  return (
    <div className="d-flex flex-wrap justify-content-between border-bottom mb-2 py-2">
      <h2 className="h3 mb-2 mb-lg-0">{title}</h2>
      <div className="d-flex">
        <Filter categories={categories} handleCategoriesChange={handleCategoriesChange} />
      </div>
      {/* <Button variant="primary" onClick={handleShow} id="GameModal" style={{ display: 'none' }}>
        Launch static backdrop modal
      </Button> */}

      {/* <Modal
        onSubmit={handleSubmit}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="modal-90w"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-2 mb-2">
              <Col md={6}>
                <FloatingLabel controlId="floatingInputGrid" label="Name">
                  <Form.Control
                    type="text"
                    placeholder="Game's Name"
                    autoFocus
                    required
                    value={game.name}
                    onBlur={(ev) => fetchData(ev.target.value, apiKey)}
                    onChange={(ev) => setGame({ ...game, name: ev.target.value })}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Game Type">
                  <Form.Select
                    aria-label="Floating label select example"
                    required
                    value={game.game_type}
                    onChange={(ev) => setGame({ ...game, game_type: ev.target.value })}
                  >
                    <option value="">Choose game type</option>

                    {sortedCategories.map(({ category, description, id }) => (
                      <option value={category} key={id}>
                        {description}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="App ID">
                  <Form.Control
                    type="text"
                    placeholder="App ID"
                    value={game.app_id}
                    onChange={(ev) => setGame({ ...game, app_id: ev.target.value })}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2 mb-2">
              <Col md={6}>
                <FloatingLabel controlId="floatingSelectGrid" label="Executable">
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    required
                    onClick={handleSelectExecutable}
                    value={game.executable}
                    onChange={(ev) => setGame({ ...game, executable: ev.target.value })}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Parameters">
                  <Form.Control
                    type="text"
                    placeholder="parameters"
                    value={game.parameters}
                    onChange={(ev) => setGame({ ...game, parameters: ev.target.value })}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <FloatingLabel controlId="floatingSelectGrid" label="Summary">
                  <Form.Control
                    as="textarea"
                    style={{ height: '120px' }}
                    value={game.summary}
                    onChange={(ev) => setGame({ ...game, summary: ev.target.value })}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-2">
              {game.screenshots ? (
                <Col md={10}>
                  <span className="d-block">Screenshots</span>
                  <div className="media-scroller">
                    {JSON.parse(game.screenshots).map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={game.name}
                        height="160"
                        className="col"
                      />
                    ))}
                  </div>
                </Col>
              ) : (
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Screenshots</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
              )}
              {game.poster ? (
                <Col md={2}>
                  <span className="d-block">Poster</span>
                  <img src={game.poster} alt={game.name} height="160" />
                </Col>
              ) : (
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Poster</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              )}
            </Row>
            <Row className="mb-2">
              {game.videos ? (
                <Col md>
                  <span className="d-block">Videos</span>
                  <div className="media-scroller">
                    {JSON.parse(game.videos).map((video, index) => (
                      <Ratio key={index} aspectRatio="16x9">
                        <iframe
                          title={`${game.name} video`}
                          width="560"
                          height="315"
                          src={video}
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen={false}
                        />
                      </Ratio>
                    ))}
                  </div>
                </Col>
              ) : (
                <Form.Group controlId="formFsile" className="mb-3">
                  <Form.Label>Videos</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Understood
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}
    </div>
  )
}

Header.propTypes = {
  categories: PropTypes.array,
  page_title: PropTypes.string
}

export default Header
