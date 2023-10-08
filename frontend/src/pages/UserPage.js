import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loadUserProfile, updateUserProfile } from '../redux/slices/userSlice';

function UserPage() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const token = useSelector((state) => state.user.token);
  const userProfile = useSelector((state) => state.user.profile);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');

  useEffect(() => {
    if (token && !userProfile) {
      dispatch(loadUserProfile(token));
    }

    const handleStorageChange = () => {
      if (token && !userProfile) {
        dispatch(loadUserProfile(token));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch, token, userProfile]);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ firstName, lastName }));
    setEditMode(false);
  };

  const handleEditButtonClick = () => setEditMode(true);

  if (!token || userStatus === 'failed') {
    return <Navigate to="/" />;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userProfile?.firstName} {userProfile?.lastName}!</h1>
        <button className="edit-button" onClick={handleEditButtonClick}>Edit Name</button>
        {editMode ? (
          
          <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditMode(false);
            }
          }}>
          
            <form onSubmit={handleProfileUpdate} className="edit-profile-form modal-content" id="edit-profile-form">
            <button className="close-modal no-style-button" type="button" data-dismiss="modal" onClick={() => setEditMode(false)}>&times;</button>
              <label htmlFor="firstName">
                First Name:
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Enter First Name"
                />
              </label>
              <label htmlFor="lastName">
                Last Name:
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Enter Last Name"
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" data-dismiss="modal" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          null
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default UserPage;
