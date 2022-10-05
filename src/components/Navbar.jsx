import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../hooks/useAuthentication'

import { useAuthValue } from '../context/AuthContext'

import styles from './Navbar.module.css'

const Navbar = () => {
  const { user } = useAuthValue()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        My <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Registre-se
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
