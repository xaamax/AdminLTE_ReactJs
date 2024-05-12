import React from 'react';

const If = ({ test, children }) => {
    if(test) {
        return <div>{children}</div>
    } else {
        return false
    }
}

export default If