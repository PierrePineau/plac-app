import {Spinner as Spin} from "@heroui/spinner";
import React from 'react';

const Spinner: React.FC<{message: string}> = ({
    message
}) => {
    return (
        <div className={`inline-flex gap-2 items-center`}>
            <Spin /> <span>{message}</span>
        </div>
    );
};
export default Spinner;