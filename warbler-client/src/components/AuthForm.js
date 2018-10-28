import React, { Component } from "react"

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: "",
            password: '',
            profileImageUrl: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin"
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(() => {
                return;
            })
    }
    render() {
        const { email, username, password, profileImageUrl } = this.state
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;

        history.listen(() => {
            removeError();
        })

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className="alert alert-danger">
                                    {errors.message}
                                </div>
                            )}
                            <label htmlFor="email">Email:</label>
                            <input className='form-control' type="email" name="email" value={email} id="email" onChange={this.handleChange} />
                            <label htmlFor="password">Password:</label>
                            <input className='form-control' type="password" name="password" value={password} id="password" onChange={this.handleChange} />

                            {signUp && (
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input className='form-control' type="text" name="username" value={username} id="username" onChange={this.handleChange} />
                                    <label htmlFor="image-url">Image URL:</label>
                                    <input className='form-control' type="password" name="profileImageUrl" value={profileImageUrl} id="image-url" onChange={this.handleChange} />
                                </div>
                            )}
                            <button className="btn-primary btn-block btn-lg">
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}

