'use client'

import React from 'react'

const Stepwhitelist = ({ onNext }) => {
    return (
        <>
            <div>
                <h3>step 5</h3>
                <a onClick={onNext}>Next</a>
            </div>
        </>
    )
}

export default Stepwhitelist