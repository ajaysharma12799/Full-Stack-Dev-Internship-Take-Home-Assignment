import React from 'react'
import Imagea from '../img/a.png';
import Imageb from '../img/b.png';

function ImageB() {
    return (
        <div className="row container mx-auto my-auto">
            <div className="col-6">
                <img src={ Imagea } alt="Image A on Left Side"/>
            </div>
            <div className="col-6">
                <img src={ Imageb } alt="Image B on Right Side"/>
            </div>
        </div>
    )
}

export default ImageB;