import React from 'react';
import "./login.scss"
import siteConfig from "../../config/site-config.js";
import InputField from "../../component/InputField/InputField.jsx";
import Button from "../../component/button/Button.jsx";
const Login = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <img className="login-page-logo" src={siteConfig.company_logo}/>
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
                    // onBlur={loginFormik.handleBlur}
                    // value={loginFormik.values.email}
                    // onchangeCallback={loginFormik.handleChange}
                    // inputClassName={loginFormik.touched.email && loginFormik.errors.email ? " is-invalid" : ""}
                    // requiredMessage={loginFormik.touched.email && loginFormik.errors.email}
                    // requiredMessageLabel={loginFormik.touched.email || loginFormik.isSubmitting ? loginFormik.errors.email : ""}
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
                        // value={loginFormik.values.password}
                        asterisk={true}
                        whiteSpace={false}
                        // onBlur={loginFormik.handleBlur}
                        // inputValue={loginFormik.values.password}
                        // onchangeCallback={loginFormik.handleChange}
                        // inputClassName={loginFormik.touched.password && loginFormik.errors.password ? " is-invalid" : ""}
                        // requiredMessage={loginFormik.touched.password && loginFormik.errors.password}
                        // requiredMessageLabel={loginFormik.touched.password || loginFormik.isSubmitting ? loginFormik.errors.password : ""}

                    />
                </div>
                <Button
                    type="submit"
                    btnText="Login"
                    btnClassName="login-btn"
                    // isLoading={loading}
                    // onClickCallback={loginForm.handleSubmit}
                />
            </div>
        </div>
    );
};

export default Login;