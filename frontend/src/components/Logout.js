import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import UserName from './UserName';

function Logout() {
  const dispatch = useDispatch();
  const firstName = useSelector(state => state.user.profile?.firstName || '');

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <UserName firstName={firstName} />
      <a href="/" onClick={handleLogout} className="main-nav-item">
        <i className="fa fa-sign-out"></i>
        <span className="user-action">
          Sign Out
        </span>
      </a>
    </>
  );
}

export default Logout;
