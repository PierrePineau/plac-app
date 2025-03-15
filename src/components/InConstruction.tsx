import { Alert } from '@heroui/alert';
import React from 'react';

const InConstruction: React.FC<{message?: string}> = ({
    message= "Cette section ou cette page n'est pas encore implémentée pour la démo"
}) => {
    return (
        <Alert
            variant={"bordered"}
            color="primary"
            description={message ?? ""}
            className="mb-4"
          />
    );
};

export default InConstruction;