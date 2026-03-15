import React from 'react';
import Plantlist from './Plantlist.jsx';

 function CustomerDashboard({ searchTerm }) {
  return (
    <div>
      <h2>Welcome Customer!</h2>
      <p>Browse and buy plants below:</p>
      <Plantlist searchTerm={searchTerm} />
    </div>
  );
}
export default CustomerDashboard;