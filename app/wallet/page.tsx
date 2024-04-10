import React from 'react';

const Page: React.FC = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe 
                src="https://mantle-folio.vercel.app/" 
                style={{ height: '100%', width: '100%', border: 'none' }}
                title="Mantle Folio"
            />
        </div>
    );
};

export default Page;