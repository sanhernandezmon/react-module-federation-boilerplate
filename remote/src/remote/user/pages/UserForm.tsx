// UserForm.tsx
import React from 'react';
import useUserStore, { UserData } from '../stores/useUserStore';
import '../styles/UserForm.css';

const UserForm = () => {
  const [user, setUser] = React.useState<UserData>({id: 0, name: '', email: '', number: '' });
  const {lastUserId, addUser } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = { ...user, id: lastUserId + 1 }; // Generate an incremental ID
    addUser(newUser);    
    setUser({ id: 0 , name: '', email: '', number: '' }); // Reset form fields
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof UserData) => {
    setUser({ ...user, [key]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={user.name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder="John Doe"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => handleChange(e, 'email')}
          placeholder="name@example.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="number">Number:</label>
        <input
          id="number"
          type="text"
          value={user.number}
          onChange={(e) => handleChange(e, 'number')}
          placeholder="1234"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
