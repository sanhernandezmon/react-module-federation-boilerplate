import React ,{ useState } from 'react';
import useUserStore, { UserData } from '../stores/useUserStore';
import { FaSearch } from 'react-icons/fa';
import '../styles/UserList.css'; 



const UserList = () => {
  const { users, deleteUser } = useUserStore();
  const [deletingUserId, setDeletingUserId] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>(users);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteClick = (userId: number) => {
    deleteUser(userId);
    setDeletingUserId(userId);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setFilteredUsers(updatedUsers);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };
  
  const handleSearchClear = () => {
    setSearchQuery('');
    setFilteredUsers(users);
  };
  


  return (
    <div className="user-card">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        {searchQuery.length > 0 && (
          <button className="search-icon" onClick={handleSearchClear}>
            <FaSearch />
          </button>
        )}
        {searchQuery.length === 0 && (
          <button className="search-icon" disabled={true}>
            <FaSearch />
          </button>
        )}
      </div>
      <h2>User List</h2>
      <table className="user-table"> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: UserData) => ( 
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td>
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  disabled={deletingUserId === user.id}
                >
                  <FaSearch />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;