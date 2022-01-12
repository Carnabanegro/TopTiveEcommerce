import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function AdminPanel() {
    return (
        <div className="container-fluid p-5">
            <div className="Row align-items-center justify-content-center">
                <h1>Admin Panel</h1>
            </div>
            <div className="Row align-items-center justify-content-center">
                <ConstructionIcon style={{fontSize: '200px'}}/>
                <h2>Building</h2>
            </div>
        </div>
    )
}