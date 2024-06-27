import React from 'react';

interface HomeProps {
    welcomeText: string;
}

const Icon: React.FC<HomeProps> = ({ welcomeText }) => {
    return (
        <div>
            <h1>{welcomeText}</h1>
        </div>
    );
}

export default Icon;