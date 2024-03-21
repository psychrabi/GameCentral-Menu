import { useEffect, useMemo } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import AppTypes from '../../data/AppTypes.js'

function Applications() {
  const { token, member, fetchApplications, applications, filter, setFilter, type, setType, getApplication, setCount, setTitle } = useBoundStore(state => ({
    token: state.token,
    member: state.member,
    fetchApplications: state.fetchApplications,
    applications: state.applications,
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    getApplication: state.getApplication,
    setCount: state.setCount,
    setTitle: state.setTitle
  }));

  useEffect(() => {
    if (applications.length === 0) {
      fetchApplications(member.center_id, token);
    }
    setFilter('');
    setType('');
    setTitle('All Applications');
  }, [member.center_id, token, fetchApplications, applications.length, setFilter, setType, setTitle]);

  const filteredApps = useMemo(() => applications.filter(item => {
    return filter ? item.name.toLowerCase().includes(filter.toLowerCase()) : type ? item.game_type === type : true;
  }), [applications, filter, type]);

  useEffect(() => {
    setCount(filteredApps.length);
  }, [filteredApps, setCount]);

  return (
    <>
      <Header categories={AppTypes} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredApps} getData={getApplication} />
      </div>
    </>
  );
}

export default Applications
