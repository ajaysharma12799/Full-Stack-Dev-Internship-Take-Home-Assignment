import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

import { SigninFrontEnd, isAuthenticated, Authenticate} from './../auth/index';

const Signin = () => {

    const [values, setValues] = useState({
        userName: '',
        passwordInput: '',
        error: '',
        didRedirect: false
    })

    const { userName, passwordInput, error, didRedirect } = values;

    const { user } = isAuthenticated();
    console.log(`User from isAuthenticated() is : ${JSON.stringify(user)}`);

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        SigninFrontEnd({userName, passwordInput})
        .then( (data) => {
            if(data.error) {
                setValues({...values, error: data.error});
            }
            else {
                Authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    });   
                });
            }
        } )
        .catch( (error) => {
            console.log(`Error Caught in Signin \n ${error}`);
        } )
    }

    const performRedirect = () => {
        if(didRedirect) {
            if(user && user.type === 0) {
                console.log('Redirecting to Image One')
                return <Redirect to='/user/ImageOne'/>
            }

            if(user && user.type === 1) {
                console.log('Redirecting to Image Two');
                return <Redirect to='/user/ImageTwo' />
            }
            if (user && user.type === 2){
                console.log('Redirecting to Image Three');
                return <Redirect to='/user/ImageThree' />
            }
        }
    }

    const errorMessage = () => (
        <div className="container alert alert-warning alert-dismissible fade show"
            style={ { display: error ? '' : 'none' } }
            role="alert"
        >
            { error }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )

    const Form = () => (
        <div className="container mx-auto my-auto">
            <form>
                <div className="form-group">
                    <input type="text"  placeholder="Enter UserName" onChange={ handleChange('userName') } value={ userName }  className="form-control mx-auto my-auto" />
                </div>
                <div className="form-group">
                    <input type="text"  placeholder="Enter Password" onChange={ handleChange('passwordInput') } value={ passwordInput }  className="form-control mx-auto my-auto" />
                </div>
                <button className="btn btn-block bg-primary" onClick={ onSubmit } >Signin</button>
            </form>
        </div>
    )

    return (
        <div>
            <h1 className="text-center">Signin Form</h1>
            { errorMessage() }
            { Form() }
            { performRedirect() }
        </div>
    )
}

export default Signin;