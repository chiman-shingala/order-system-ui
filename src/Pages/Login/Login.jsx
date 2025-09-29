import React, { useState } from 'react'
import './Login.css'
import login_logo from '../../assets/images/softclues.png'
import { useForm } from 'react-hook-form';
import { ChangePassword, signIn } from '../../Services/AuthService/AuthService';

function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm();
    const [isForgot, setisForgot] = useState(false);
    const onSubmit = (data) => {
        signIn(data);
    };

    const onChangePassword = (data) => {
        ChangePassword(data);
        reset2();
    }

    const forgotPassword = () => {
        setisForgot(true);
    }
    return (
        <>
            <div className='login_page'>
                <div className={`${!isForgot ? "" : 'd-none'} login_form`}>
                    <div className='login_logo'>
                        <img src={login_logo} alt="" width='100%' height='100%' />
                    </div>
                    <div className='login_form_section'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className='form_label'>Email:</label>
                            <input type="Email" className='form_input' {...register("email", { required: true })} />
                            {errors.email && <span className='error_message'>Email is required</span>}

                            <label className='form_label'>Password:</label>
                            <input type="password" className='form_input' autoComplete="on" {...register("password", { required: true })} />
                            {errors.password && <span className='error_message'>Password is required</span>}

                            <button className='button_dark mt-5 px-5 py-2'>Sign in</button>
                            <br />
                            <span className='button_link mt-3' onClick={forgotPassword}>Forgot password?</span>
                        </form>
                    </div>
                </div>
                <div className={`${isForgot ? "" : 'd-none'} login_form`}>
                    <div className='login_form_section'>
                        <form onSubmit={handleSubmit2(onChangePassword)}>
                            <h4>Change your password</h4>
                            <label className='form_label'>User Name:</label>
                            <input type="UserName" className='form_input' {...register2("userName", { required: true })} />
                            {errors2.userName && <span className='error_message'>User Name is required</span>}

                            <label className='form_label'>Password:</label>
                            <input type="password" className='form_input' autoComplete="on" {...register2("Password", { required: true })} />
                            {errors2.Password && <span className='error_message'>Password is required</span>}

                            <label className='form_label'>New Password:</label>
                            <input type="password" className='form_input' autoComplete="on" {...register2("NewPassword", { required: true })} />
                            {errors2.NewPassword && <span className='error_message'>Password is required</span>}

                            <button className='button_dark mt-5 px-5 py-2'>Save</button>
                            <br />
                            <span className='button_link mt-3' onClick={() => setisForgot(false)}>Back to login</span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login