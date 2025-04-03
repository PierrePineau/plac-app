import React from 'react';

const AppDebugInfo: React.FC = () => {
    const appInfo = [
        { key: 'Version', value: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0' },
        { key: 'Environment', value: process.env.NODE_ENV || 'development' },
        { key: 'Build ID', value: process.env.NEXT_PUBLIC_BUILD_ID || 'local' },
        { key: 'API Version', value: process.env.NEXT_PUBLIC_API_VERSION || 'v1' },
        { key: 'API URL', value: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com' },
        { key: 'Build Date', value: new Date().toLocaleString() },
    ]

    return (
        <div className='flex flex-col items-center'>
            <h2>App Debug Info</h2>
            <ul>
                {appInfo.map((info) => (
                    <li key={info.key}>
                        <strong>{info.key}:</strong> {info.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppDebugInfo;