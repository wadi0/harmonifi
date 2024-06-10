import React, {useState} from 'react';
import "./login.scss"
import siteConfig from "../../config/site-config.js";
import InputField from "../../component/InputField/InputField.jsx";
import Button from "../../component/button/Button.jsx";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import path from "../../routes/path.js";

const Login = () => {

      // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginFormValidate = (values) => {
        const errors = {};

        if (values.password.trim().length < 6)
            errors.password = "Password must be at least 6 characters";
        if (!values.password.trim()) errors.password = "Password is required";

        if (!values.email.trim())
            errors.email = "Email is required";

        return errors;
    };

    const submitLoginForm = (values) => {
        let payload = {
            email: values.email,
            password: values.password
        }
        console.log(payload)
        navigate(path.home)
    }

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: loginFormValidate,
        onSubmit: submitLoginForm,
    });

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="text-center">
                    <img className="login-page-logo" src={siteConfig.company_logo}/>
                </div>
                <div className="email-password-field mb-2">
                    <InputField
                        id="email"
                        // label='auth_page.email'
                        // className="mb-10"
                        // inputClassName=""
                        // labelLinkText='auth_page.try_mobile_number'
                        // labelOnChangeCallback={handleEmailOrPhone}
                        placeholder='Email'
                        textType="email"
                        inputName="email"
                        asterisk={true}
                        whiteSpace={false}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.email}
                        onchangeCallback={loginForm.handleChange}
                        inputClassName={loginForm.touched.email && loginForm.errors.email ? " is-invalid" : ""}
                        requiredMessage={loginForm.touched.email && loginForm.errors.email}
                        requiredMessageLabel={loginForm.touched.email || loginForm.isSubmitting ? loginForm.errors.email : ""}
                    />
                </div>
                <div className="email-password-field mb-2">
                    <InputField
                        type="password"
                        placeholder='Password'
                        // label={`${t('auth_page.password')} *`}
                        // labelLinkText={t('auth_page.forget_password')}
                        // labelLink={`${process.env.PUBLIC_URL}${path.forget_password}`}
                        inputName="password"
                        value={loginForm.values.password}
                        asterisk={true}
                        whiteSpace={false}
                        onBlur={loginForm.handleBlur}
                        inputValue={loginForm.values.password}
                        onchangeCallback={loginForm.handleChange}
                        inputClassName={loginForm.touched.password && loginForm.errors.password ? " is-invalid" : ""}
                        requiredMessage={loginForm.touched.password && loginForm.errors.password}
                        requiredMessageLabel={loginForm.touched.password || loginForm.isSubmitting ? loginForm.errors.password : ""}

                    />
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        btnText="Log in"
                        btnClassName="login-btn"
                        // isLoading={loading}
                        onClickCallback={loginForm.handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;