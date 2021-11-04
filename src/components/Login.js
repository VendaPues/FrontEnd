import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Swal from 'sweetalert2'

import './Login.css'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn : false,
            username: "",
            password: "",
            showPassword: false
        };
        this.verificateUser = this.verificateUser.bind(this);
        this.verificate = this.verificate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('isLoggedIn')){
            this.setState({isLoggedIn: true});
        }else{
            this.setState({isLoggedIn: false});
        }
        localStorage.setItem('username', "admin");
        localStorage.setItem('password', "admin");
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    verificateUser(){
        if(localStorage.getItem('username') && localStorage.getItem('password')){
            if((localStorage.getItem('username') === this.state.username && 
                localStorage.getItem('password') === this.state.password)){
                localStorage.setItem('isLoggedIn', true)
                this.props.signIn();
                Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success')
            }else{
                Swal.fire('Error', 'Usuario invalido', 'error')
            }
            
        }
    }

    verificate(){
        if(this.state.username === "" && this.state.password === ""){
            Swal.fire('Error', 'error', 'error')
        }else{
            this.verificateUser();
        }
    }

    handleClickShowPassword = () => {
        this.setState({showPassword : !this.state.showPassword})
      };

    render(){

        return (
            
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <h1 style={{ color: 'blue' }}>VENDAPUES!</h1>

                                           
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={this.state.email} 
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    name="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick={this.verificate}
                            >
                                Login
                            </Button>
                        </form>

                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}

export default Login;