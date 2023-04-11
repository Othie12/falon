import { useState, useEffect } from "react";
//import axios from 'axios';

export default function UserProfile({id}){
    const [user, setUser] = useState(null);
/* HAD NO INTERNET TO IMPORT AXIOS
    useEffect(() => {
        //make API request to fetch user data
        axios.get('/api/user/profile')
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
*/
    useEffect(() => {
        fetch('http://localhost:8080/User_profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error))
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <img src={user ? user.profilePicture: ''} className='img-fluid mb-3' alt="Profile" />
                            <h5 className="card-title">{user ? user.name : ''}</h5>
                            <p className="card-text">{user ? user.email : ''}</p>
                            <a href="#" className="btn btn-primary">Edit Profile</a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">My Beats</h5>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Beat Name</th>
                                        <th scope="col">Producer</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user ? user.beats.map((beat, index) => (
                                        <tr key={beat.id}>
                                            <th scope="row">{index +1}</th>
                                            <td>{beat.name}</td>
                                            <td>{beat.producer}</td>
                                            <td>{beat.price}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4">NO beats purchased yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}