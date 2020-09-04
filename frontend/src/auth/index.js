import { API } from '../backend';

export const SignupFrontEnd = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(`Error in Communicating With Signup Backend API \n ${error}`);
    } )
}

export const SigninFrontEnd = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(`Error in Communicating Signin Backend API \n ${error}`);
    } )
}

export const Authenticate = (data, next) => {
    if(typeof Window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof Window == 'undefined') {
        return false;
    }

    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
}