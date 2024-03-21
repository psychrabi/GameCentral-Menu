import { useEffect, useMemo } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import GameTypes from '../../data/GameTypes.js'
import { useBoundStore } from '../../components/stores/BoundStore'

const Home = () => {
  const { token, member, fetchFavoriteGames, favoriteGames, filter, setFilter, type, setType, getFavoriteGame, setCount, setTitle } = useBoundStore(state => ({
    token: state.token,
    member: state.member,
    fetchFavoriteGames: state.fetchFavoriteGames,
    favoriteGames: state.favoriteGames,
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    getFavoriteGame: state.getFavoriteGame,
    setCount: state.setCount,
    setTitle: state.setTitle
  }));

  useEffect(() => {
    if (!favoriteGames) {
      fetchFavoriteGames(member.id, token);
    }
    setFilter('');
    setType('');
    setTitle('Favorite Games');
  }, [member.id, token, fetchFavoriteGames, favoriteGames, setFilter, setType, setTitle]);

  const filteredGames = useMemo(() => favoriteGames?.filter((item) => {
    const itemNameLower = item.name.toLowerCase();
    const filterLower = filter.toLowerCase();
    return filter ? itemNameLower.includes(filterLower) : type ? item.game_type === type : true;
  }), [favoriteGames, filter, type]);

  useEffect(() => {
    setCount(filteredGames?.length);
  }, [filteredGames, setCount]);

  return (
    <>
      <Header categories={GameTypes} page_title={'All Games'} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredGames} getData={getFavoriteGame} />
      </div>
    </>
  );
};

export default Home
