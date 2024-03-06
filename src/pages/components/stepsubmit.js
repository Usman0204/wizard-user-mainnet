'use client'

import React from 'react'

const Stepsubmit = ({ onNext }) => {
    return (
        <>
            <div>
                <h3>step 6</h3>
                <a onClick={onNext}>Next</a>
            </div>
        </>
    )
}

export default Stepsubmit