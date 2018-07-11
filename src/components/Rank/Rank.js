import React from 'react';

const Rank = ({user}) => {
  return (
    <div>
      <div className="f3 white">{`Welcome ${user.name} to Smart brain`}</div>
      <div className="f3 white">{`Number of entry: ${user.entries}`}</div>
    </div>
  );
};

export default Rank;
