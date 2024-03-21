import { useEffect, useMemo } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import GameTypes from '../../data/GameTypes.js'

function Games() {
  const { token, member, fetchGames, games, filter, setFilter, type, setType, getGame, setCount, setTitle } = useBoundStore(state => ({
    token: state.token,
    member: state.member,
    fetchGames: state.fetchGames,
    games: state.games,
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    getGame: state.getGame,
    setCount: state.setCount,
    setTitle: state.setTitle
  }));

  useEffect(() => {
    if (games.length === 0) {
      fetchGames(member.center_id, token);
    }
    setFilter('');
    setType('');
    setTitle('All Games');
  }, [fetchGames, member.center_id, token]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const gameNameLower = game.name.toLowerCase();
      const filterLower = filter.toLowerCase();
      return filter ? gameNameLower.includes(filterLower) : type ? game.game_type === type : true;
    });
  }, [games, filter, type]);

  useEffect(() => {
    setCount(filteredGames.length);
  }, [filteredGames.length]);

  return (
    <>
      <Header categories={GameTypes} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredGames} getData={getGame} />
      </div>
    </>
  );
}

export default Games
