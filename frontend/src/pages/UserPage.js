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

  if (!token || userStatus === 'failed') {
    return <Navigate to="/" />;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {editMode ? (
            <>
              <form onSubmit={handleProfileUpdate} className="edit-profile-form">
                <div className="name-inputs">
                  <label htmlFor="firstName">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      placeholder={userProfile?.firstName || "First Name"}
                    />
                  </label>
                  <label htmlFor="lastName">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={handleLastNameChange}
                      placeholder={userProfile?.lastName || "Last Name"}
                    />
                  </label>
                </div>

                <div className="button-group">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" onClick={() => {
                    setFirstName(userProfile?.firstName || '');
                    setLastName(userProfile?.lastName || '');
                    setEditMode(false);
                  }}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
           
              <>
                <span className="username-display">
                  {userProfile?.firstName} {userProfile?.lastName}
                </span>
                <button className="edit-button" onClick={() => setEditMode(true)}>Edit Name</button>
              </>
            )}
          </h1>

        
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
