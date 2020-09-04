import React, { useState } from 'react'
import { SignupFrontEnd } from './../auth/index';

const Signup = () => {

    const [values, setValues] = useState({
        userName: '',
        password: '',
        type: '',
        error: '',
        success: false
    });

    const { userName, password, type, error, success } = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        SignupFrontEnd({userName, password, type})
        .then( (data) => {
            if(data.error) {
                setValues({...values, error: data.error, success: false});
            }
            else {
                setValues({
                    ...values,
                    userName: '',
                    password: '',
                    type: '',
                    error: '',
                    success: true
                })
            }
        } )
        .catch( (error) => {
            console.log(`Error Caught in Signup \n ${error}`);
        } )
    }

    const Form = () => (
        <div className="container mx-auto my-auto">
            <form>
                <div className="form-group">
                    <input type="text" onChange={ handleChange('userName') } placeholder="Enter UserName" value={ userName } className="form-control mx-auto my-auto" />
                </div>
                <div className="form-group">
                    <input type="text" onChange={ handleChange('password') } placeholder="Enter Password" value={ password }  className="form-control mx-auto my-auto" />
                </div>
                <div className="form-group">
                    <label>Type : </label>
                    <select className="form-control" onChange={ handleChange('type') } value={ type }>
                        <option> Select Type of Your Choice </option>
                        <option value="0"> A </option>
                        <option value="1"> B </option>
                        <option value="2"> C </option>
                    </select>
                </div>
                <button className="btn btn-block bg-primary" onClick={ onSubmit } >Signup</button>
            </form>
        </div>
    )

    const successMessage = () => (
        <div className="container alert alert-success alert-dismissible fade show"
            style={ { display: success ? '' : 'none' } }
            role="alert"
        >
            Account Created Successfully
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )

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

    return (
        <div>
            <h1 className="text-center">Signup Form</h1> 
            { successMessage() }
            { errorMessage() }
            { Form() }
        </div>
    )
}

export default Signup;