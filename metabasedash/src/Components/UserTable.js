import React, { useState, useRef, useEffect } from 'react';
import { Pagination } from '@mui/material';
import './Pagination.css';

// Dummy data for users, matches, and tournaments
const userDummyData = [
  { id: 1, userName: 'sam', email: 'sam@example.com', age: 25, role: 'admin', status: 'active', isVisible: true },
  { id: 2, userName: 'john', email: 'john@example.com', age: 30, role: 'user', status: 'inactive', isVisible: false },
  { id: 3, userName: 'alice', email: 'alice@example.com', age: 28, role: 'user', status: 'active', isVisible: true },
  { id: 4, userName: 'jane', email: 'jane@example.com', age: 22, role: 'user', status: 'active', isVisible: true },
  { id: 5, userName: 'bob', email: 'bob@example.com', age: 35, role: 'admin', status: 'inactive', isVisible: false },
];

const matchDummyData = [
  { id: 1, matchName: 'Match 1', date: '2024-09-01' },
  { id: 2, matchName: 'Match 2', date: '2024-09-02' },
  { id: 3, matchName: 'Match 3', date: '2024-09-03' },
  { id: 4, matchName: 'Match 4', date: '2024-09-04' },
];

const tournamentDummyData = [
  { id: 1, tournamentName: 'Tournament 1', location: 'City A' },
  { id: 2, tournamentName: 'Tournament 2', location: 'City B' },
  { id: 3, tournamentName: 'Tournament 3', location: 'City C' },
  { id: 4, tournamentName: 'Tournament 4', location: 'City D' },
];

const UserTable = () => {
  const [users, setUsers] = useState(userDummyData);
  const [view, setView] = useState('users'); // Default state is 'users'
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef(null);
  const headerRef = useRef(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getPaginatedItems = (data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const renderPagination = (data) => (
    <Pagination
      count={totalPages(data)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      size="small"
    />
  );

  const toggleVisibility = (id) => {
    setUsers(users.map((user) => 
      user.id === id ? { ...user, isVisible: !user.isVisible } : user
    ));
  };

  const handleClickOutside = (event) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target) &&
      headerMenuRef.current &&
      !headerMenuRef.current.contains(event.target)
    ) {
      setHeaderMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDropdownOptions = () => {
    const options = [];
    if (view !== 'users') options.push('users');
    if (view !== 'matches') options.push('matches');
    if (view !== 'tournaments') options.push('tournaments');
    return options;
  };

  const renderUsersTable = () => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>isVisible</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedItems(users).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isVisible}
                  onChange={() => toggleVisibility(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination(users)}
    </div>
  );

  const renderMatchesTable = () => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Match Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedItems(matchDummyData).map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.matchName}</td>
              <td>{match.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination(matchDummyData)}
    </div>
  );

  const renderTournamentsTable = () => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tournament Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedItems(tournamentDummyData).map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.id}</td>
              <td>{tournament.tournamentName}</td>
              <td>{tournament.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination(tournamentDummyData)}
    </div>
  );

  return (
    <div className="dashboard">
      <div className="header" ref={headerRef}>
        <h1>{view.charAt(0).toUpperCase() + view.slice(1)} Dashboard</h1>
        <div className="header-menu-container" ref={headerMenuRef}>
          <button onClick={() => setHeaderMenuOpen(!headerMenuOpen)} className="menu-button">
            &#9660;
          </button>
          {headerMenuOpen && (
            <div className="header-menu">
              <ul>
                {getDropdownOptions().map((option) => (
                  <li key={option} onClick={() => {
                    setView(option);
                    setCurrentPage(1); // Reset to page 1 on view change
                  }}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {view === 'users' && renderUsersTable()}
      {view === 'matches' && renderMatchesTable()}
      {view === 'tournaments' && renderTournamentsTable()}
    </div>
  );
};

export default UserTable;
