class GameAPI {
  constructor(token) {
    this.baseUrl = 'http://gamecentralmenu.test/api/games'
    this.token = token
  }

  async getGames() {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      return data.map((game) => this.deserializeGame(game))
    } else {
      throw new Error(`Failed to get games: ${response.statusText}`)
    }
  }

  async addGame(game) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(game)
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error(`Failed to add game: ${response.statusText}`)
    }
  }

  async editGame(game) {
    const url = `${this.baseUrl}/${game.id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(this.serializeGame(game))
    })
    if (response.ok) {
      const data = await response.json()
      return this.deserializeGame(data)
    } else {
      throw new Error(`Failed to edit game: ${response.statusText}`)
    }
  }

  async deleteGame(game) {
    const url = `${this.baseUrl}/${game.id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to delete game: ${response.statusText}`)
    }
  }

  serializeGame(game) {
    return {
      id: game.id,
      title: game.title,
      description: game.description,
      releaseDate: game.releaseDate
    }
  }

  deserializeGame(data) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      releaseDate: new Date(data.releaseDate)
    }
  }
}

export { GameAPI }
