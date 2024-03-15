import React from 'react';

const ThankYouPage = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3em', fontWeight: 'bold' }}>Thank You!</h1>
        <p style={{ fontSize: '2em' }}>Your vote has been submitted successfully.</p>
      </div>
    );
  };

export default ThankYouPage;