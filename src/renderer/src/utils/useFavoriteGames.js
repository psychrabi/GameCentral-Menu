import { useState, useEffect } from 'react';
import axiosClient from '../lib/axios-client';

const useFavoriteGames = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const member = JSON.parse(localStorage.getItem('member'));

  useEffect(() => {
    if (!localStorage.getItem('favorite_games')) {
      setIsLoading(true);
      try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + member.token;
        axiosClient.get(`/favorite-games/${member.id}`).then(({ data }) => {
          setFavoriteGames(data);
          localStorage.setItem('favorite_games', JSON.stringify(data));
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setFavoriteGames(JSON.parse(localStorage.getItem('favorite_games')));
      setIsLoading(false);
    }
  }, []);

  return { favoriteGames, isLoading };
};

export default useFavoriteGames;
