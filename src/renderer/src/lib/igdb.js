import axios from 'axios'
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const instance = axios.create({
  baseURL: proxyUrl
})

class IGDB {
  constructor(client_id, client_secret) {
    if (client_id === undefined || client_secret === undefined)
      throw new Error('Provide both a client ID and client Secret')
    this.client_id = client_id
    this.access_token = ''
    this.isInitialized = false
    this.eventListeners = {
      initialized: []
    }

    // Get API token
    this.getApiToken(client_id, client_secret)
  }

  async getGameInfo(game) {
    if (game === undefined) console.error('No game specified')
    if (this.client_id === undefined) console.error('No client ID registered')
    if (this.access_token === undefined) console.error('No access token registered')

    this.fetchFromIGDB(`fields *; search "${game}"; where version_parent = null;`)

    // Validate
    // if (parentResult?.length === 0) return {code: 404, error: 'Could not find game in IGDB.'}

    // Fetch cover
    let covers = await this.fetchFromIGDB(`fields *; where game = ${parentResult[0].id};`, 'covers')
    let cover_base_url = covers[0].url.replace('//', 'https://')

    let web_id = parentResult[0].websites[0]
    let websites = web_id
      ? await this.fetchFromIGDB(
          `fields *; where id = (${parentResult[0].websites.join(', ')});`,
          'websites'
        )
      : undefined

    return {
      code: 200,
      covers: {
        small: cover_base_url.replace('t_thumb', `t_cover_small`),
        large: cover_base_url.replace('t_thumb', `t_cover_big`)
      },
      name: parentResult[0]?.name,
      summary: parentResult[0]?.summary,
      storyline: parentResult[0]?.storyline,
      rating: parentResult[0]?.rating,
      websites: {
        igdb: parentResult[0]?.url,
        developer: websites.filter((w) => w.category === 1)[0]?.url || undefined,
        steam: websites.filter((w) => w.category === 13)[0]?.url || undefined,
        epicgames: websites.filter((w) => w.category === 16)[0]?.url || undefined,
        youtube: websites.filter((w) => w.category === 9)[0]?.url || undefined,
        twitter: websites.filter((w) => w.category === 5)[0]?.url || undefined,
        instagram: websites.filter((w) => w.category === 8)[0]?.url || undefined
      }
    }
  }

  async getGameCovers(game) {
    if (game === undefined) console.error('No game specified')
    if (this.client_id === undefined) console.error('No client ID registered')
    if (this.access_token === undefined) console.error('No access token registered')

    const parentResult = await this.fetchFromIGDB(
      `fields *; search "${game}"; where version_parent = null;`
    )
    // Validate
    if (parentResult.data.length === 0) return { code: 404, error: 'Could not find game in IGDB.' }

    let covers_arr = []
    // Fetch cover
    let covers = await this.fetchFromIGDB(
      `fields *; where game = ${parentResult.data[0]?.id};`,
      'covers'
    )

    let cover_base_url = covers.data[0]?.url.replace('//', 'https://')
    covers_arr.push({
      small: cover_base_url.replace('t_thumb', `t_cover_small_2x`),
      large: cover_base_url.replace('t_thumb', `t_cover_big_2x`)
    })

    // Fetch screenshots
    let screenshots = await this.fetchFromIGDB(
      `fields screenshots.*; where id = ${parentResult.data[0].id};`
    )
    if (screenshots.data[0]?.screenshots !== undefined) {
      screenshots.data[0].screenshots.forEach((i) => {
        const url = i.url.replace('//', 'https://')
        covers_arr.push({
          small: url.replace('t_thumb', `t_screenshot_med`),
          large: url.replace('t_thumb', `t_screenshot_huge`)
        })
      })
    }
    return {
      code: 200,
      covers: covers_arr
    }
  }

  async fetchFromIGDB(query, endpoint = 'games') {
    // return axios post response
    return await instance.post(`https://api.igdb.com/v4/${endpoint}`, query, {
      headers: {
        'Client-ID': this.client_id,
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

  getApiToken(client_id, client_secret) {
    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
      )
      .then((response) => {
        const res = response.data
        if (res.status === 400) console.log(`Error while fetching IGDB API token: ${res.message}`)
        this.access_token = res.access_token
        // Refresh token upon expiring
        setTimeout(() => {
          this.getApiToken(client_id, client_secret)
        }, res.expires_in)

        if (this.isInitialized) return
        this.isInitialized = true
        this.callEventListeners('initialized')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  callEventListeners(event) {
    this.eventListeners[event]?.forEach((f) => f())
  }

  on(event, callback) {
    switch (event) {
      case 'initialized':
        this.eventListeners['initialized'].push(callback)
        break

      default:
        break
    }
  }
}

export default IGDB
