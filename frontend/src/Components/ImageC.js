import React from 'react'
import Imageb from '../img/b.png';
import Imagec from '../img/c.png';

function ImageC() {
    return (
        <div className="container mx-auto my-auto">
            <div className="row">
                <img src={ Imageb } alt="Image B on Top"/>
            </div>
            <div className="row">
                <img src={ Imagec } alt="Image C on Bottom"/>
            </div>
        </div>
    )
}

export default ImageC;