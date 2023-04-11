import axios from "axios";
import React, {useEffect, useState} from "react";
//import { useHistory } from 'react-router-dom';

 const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const [err, setErr] = useState('');

    //func to autocapitalize the first letter of things like names
    const autoCapitalize = (event, setter) => {
        const { value } = event.target;
        setter(value.charAt(0).toUpperCase() + value.slice(1));
    };

    const handleFirstNameChange = (e) => {
        autoCapitalize(e, setFirstName)
    };
    const handleLastNameChange = (event) => {
        autoCapitalize(event, setLastName)
    };
    const handleUnameChange = (e) => {
        autoCapitalize(e, setUname)
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePwdChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPwdChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleContactChange = (e) => {
        setContact(e.target.value);
    };
    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
        console.log(profilePic)
       // console.log(e.target.files)
    };
    const validate = () => {
        if(confirmPassword !== password){
            setErr("The two passwords don't match");
            return false;
        }else if(!firstName.match(/^[^0-9]+$/) && !lastName.match(/^[^0-9]+$/)){
            setErr("Name should not contain numbers");
            return false;
        }else{
            setErr('')
            return true;
        } 
    };

    useEffect( () => {validate()} );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate) {
            setErr("validationError");
            console.error("validationError");
            return;
        } else {
                 //send form data to the server
            const formData = new FormData();
            formData.append("lname", lastName);
            formData.append("uname", uname);
            formData.append("fname", firstName);
            formData.append("email", email);
            formData.append("contact", contact);
            formData.append("pwd", password);
            formData.append("profilePic", profilePic);


            axios.post("http://localhost:8080/register", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
            });

            }

        };

    return (
        <div className="container">
            <h1 align="center">Registration Form</h1>
            <h3 className="text-warning">{err}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="uname">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="uname"
                        name="uname"
                        value={uname}
                        onChange={handleUnameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePwdChange}
                        minLength={6}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comfirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="comfirmPassword"
                        name="comfirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPwdChange}
                        minLength={6}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={handleContactChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profilePic">Profile Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profilePic"
                        name="profilePic"
                        //value={profilePic}
                        onChange={handleProfilePicChange}
                        accept="image/*"
                    />
                </div>
               
                    <button type="submit" className="btn btn-primary">Sign UP</button>
            </form>
        </div>
    );
 };

 export default RegistrationForm;

