import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      history.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.body}>
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div>
          <label style={styles.label}>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;

const styles = {
  body: {
    color: 'white',
  },
  container: {
    textAlign: 'center',
    marginTop: '50px',

  },
  title: {
    marginBottom: '20px',
    color: 'white',

  },
  form: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: 'black',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
  },
};
