import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        setError("");
        props.login(username, password)
            .then(() => {
                navigate("/resources");
            })
            .catch((error) => {
                setError(error.response?.data?.message || "Error logging in");
            });
    };

    const handleRegister = () => {
        setError("");
        props.register(username, password)
            .then(() => {
                navigate("/resources");
            })
            .catch((error) => {
                setError(error.response?.data?.message || "Error registering");
            });
    };

    return (
        <div className="container" style={{marginBottom: "100px", marginTop: "50px"}}>
            <div className="row justify-content-center">
                <form className="col-4">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <button type="button" className="btn me-2 rounded-4" onClick={handleLogin} style={{backgroundColor:"#D4A373",color:"white"}}>Login</button>
                    <br/>
                    <br/>
                    <h5 style={{fontWeight:"700"}}>Do not have an account?</h5>

                    <button type="button" className="btn rounded-4" onClick={handleRegister} style={{backgroundColor:"#D4A373",color:"white"}}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
