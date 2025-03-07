import { Alert } from '@heroui/alert';
import React from 'react';

const InConstruction: React.FC = () => {
    return (
        <Alert
            variant={"bordered"}
            color="primary"
            description={"Cette section ou cette page n'est pas encore implémentée pour la démo"}
            className="mb-4"
          />
    );
};

export default InConstruction;