class GameAPI {
  constructor(token) {
    this.baseUrl = 'http://gamecentralmenu.test/api/games';
    this.token = token;
  }

  async request(endpoint, options) {
    const url = endpoint ? `${this.baseUrl}/${endpoint}` : this.baseUrl;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async getGames() {
    const games = await this.request('', { method: 'GET' });
    return games.map(this.deserializeGame);
  }

  async addGame(game) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(game),
    });
  }

  async editGame(game) {
    return this.request(game.id, {
      method: 'PUT',
      body: JSON.stringify(this.serializeGame(game)),
    }).then(this.deserializeGame);
  }

  async deleteGame(game) {
    await this.request(game.id, { method: 'DELETE' });
  }

  serializeGame(game) {
    const { id, title, description, releaseDate } = game;
    return { id, title, description, releaseDate };
  }

  deserializeGame(data) {
    const { id, title, description, releaseDate } = data;
    return { id, title, description, releaseDate: new Date(releaseDate) };
  }
}

export { GameAPI }
