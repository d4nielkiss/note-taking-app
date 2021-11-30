import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  function getUser() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return null;
    } else {
      return JSON.parse(storedUser);
    }
  }

  function signIn(user) {
    setUser(user);
  }

  function signOut() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      localStorage.removeItem('user');
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, signOut, signIn }}>
      {children}
    </UserContext.Provider>
  )
}