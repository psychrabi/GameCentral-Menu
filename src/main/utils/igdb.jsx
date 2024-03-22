const fetch = require('node-fetch');

class IGDB {
  constructor(client_id, client_secret) {
    if (!client_id || !client_secret) {
      throw new Error('Provide both a client ID and client Secret');
    }
    this.client_id = client_id;
    this.token = undefined;
    this.isInitialized = false;
    this.eventListeners = {
      initialized: []
    };
    this.getApiToken(client_id, client_secret);
  }

  async getGameInfo(game) {
    this.validateInitialization();
    if (!game) throw new Error('No game specified');

    const gameDetails = await this.fetchFromIGDB(
      `fields *; search "${game}"; where version_parent = null;`
    );

    if (gameDetails.length === 0) return { code: 404, error: 'Could not find game in IGDB.' };

    const cover_base_url = gameDetails[0].cover?.url.replace('//', 'https://') || undefined;
    const websites = await this.fetchRelatedWebsites(gameDetails[0].websites);

    return this.formatGameInfo(gameDetails[0], cover_base_url, websites);
  }

  async getGameCovers(game) {
    this.validateInitialization();
    if (!game) throw new Error('No game specified');

    const gameDetails = await this.fetchFromIGDB(
      `fields *; search "${game}"; where version_parent = null;`
    );

    if (gameDetails.length === 0) return { code: 404, error: 'Could not find game in IGDB.' };
    
    const covers_arr = await this.fetchCoversAndScreenshots(gameDetails[0].id);

    return { code: 200, covers: covers_arr };
  }

  on(event, callback) {
    if (event === 'initialized') {
      this.eventListeners.initialized.push(callback);
    }
  }

  async getApiToken(client_id, client_secret) {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
      { method: 'POST' }
    );
    const res = await response.json();
    if (res.status === 400) {
      throw new Error(`Error while fetching IGDB API token: ${res.message}`);
    }
    this.token = res.access_token;

    setTimeout(() => this.getApiToken(client_id, client_secret), res.expires_in * 1000);

    if (!this.isInitialized) {
      this.isInitialized = true;
      this.callEventListeners('initialized');
    }
  }

  async fetchFromIGDB(query, endpoint = 'games') {
    const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': this.client_id,
        'Authorization': `Bearer ${this.token}`
      },
      body: query
    });
    return response.json();
  }

  callEventListeners(event) {
    this.eventListeners[event]?.forEach((f) => f());
  }

  validateInitialization() {
    if (!this.client_id || !this.token) {
      throw new Error('IGDB is not initialized with client ID and token');
    }
  }

  async fetchRelatedWebsites(websiteIds) {
    if (!websiteIds || websiteIds.length === 0) return undefined;

    const websites = await this.fetchFromIGDB(
      `fields *; where id = (${websiteIds.join(', ')});`,
      'websites'
    );

    return this.parseWebsites(websites);
  }

  parseWebsites(websites) {
    const categories = {
      1: 'developer',
      13: 'steam',
      16: 'epicgames',
      9: 'youtube',
      5: 'twitter',
      8: 'instagram'
    };
    return websites.reduce((acc, website) => {
      const category = categories[website.category];
      if (category) {
        acc[category] = website.url.replace('//', 'https://');
      }
      return acc;
    }, {});
  }

  async fetchCoversAndScreenshots(gameId) {
    const covers = await this.fetchFromIGDB(`fields url; where game = ${gameId};`, 'covers');
    const screenshots = await this.fetchFromIGDB(
      `fields screenshots.url; where id = ${gameId};`
    );
    return covers.map(cover => cover.url.replace('//', 'https://').replace('t_thumb', 't_cover_big'))
      .concat(screenshots.flatMap(s => s.screenshots?.map(ss => ss.url.replace('//', 'https://').replace('t_thumb', 't_cover_big')) || []));
  }

  formatGameInfo(gameDetails, cover_base_url, websites) {
    return {

module.exports = IGDB

