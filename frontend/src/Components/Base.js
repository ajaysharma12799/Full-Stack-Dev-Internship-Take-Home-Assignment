import React from 'react'
import NavBar from './NavBar'

function Base({
    children
}) {
    return (
        <div>
            <NavBar/>
            <div>
                { children }
            </div>
        </div>
    )
}

export default Base
