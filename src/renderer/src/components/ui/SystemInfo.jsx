import PropTypes from 'prop-types'
import { useMemo } from 'react';

export const SystemInfo = ({ stats }) => {
  const systemInfoContent = useMemo(() => {
    if (!stats) return null;

    return (
      <dl className="text-start row">
        {Object.entries(stats).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt className="col-sm-3 text-end">{key.toUpperCase()}</dt>
            <dd className="col-sm-9">{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }, [stats]);

  return (
    <footer className="position-absolute bottom-0 mb-4 me-4 end-0 text-light client-stats">
      {!stats ? (
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : systemInfoContent}
    </footer>
  );
};
SystemInfo.propTypes = {
  stats: PropTypes.object
}
