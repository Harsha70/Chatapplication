import React, {useState} from 'react'
import {auth} from "../../firebase/firebase"

const Signin = () => {
    const [signin, setsignin] = useState({
        email: '',
        password: ''
    })

    const handleChange = event =>{
        const {name,value} = event.target;
        setsignin(prevState => ({...prevState,[name]: value}))
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = signin
        try{
            await auth.signInWithEmailAndPassword(email, password);
            setsignin({email:'', password:''}); 
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <input className='sign-in-input' type='text' name='email' label='Display Name' placeholder="Email" onChange={handleChange} required/>
                <input className='sign-in-input' type='text' name='password' label='Display Name' placeholder="Password" onChange={handleChange} required/>
                <button > SignIn </button>
                <p className='sign-in-test'>testing email:<i>test@gmail.com</i></p>
                <p className='sign-in-test'>testing password:<i>test12345</i></p>
            </form>
        </div>
    )
}

export default Signin
