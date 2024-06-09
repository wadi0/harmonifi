import React, {useState} from "react";
import { Link } from "react-router-dom";
import './InputField.scss'

const InputField = (props) => {
    const active = props.textAlign ? "right-input-text" : "";
    const isError = props.isError || "";
    const isDisabled = props.isDisabled || false;
    const disabledClass = isDisabled ? "disabled" : "";
    const isMultiple = !!props.isMultiple;
    const [inputType, setInputType] = useState(props.type);
    const passwordVisiablityClick = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };
    return(
        <>
        <div className={`single-input ${props.className}`}>
            <label htmlFor="">
                <span className={props.asterisk ? "asterisk name" : "name"}>{props.label}</span>
                {props.labelLink &&  (
                    <span className="link">
                        <Link to={props.labelLink}>{props.labelLinkText}</Link>
                    </span>
                )}
                {props.labelOnChangeCallback && !props.showChangeField && (
                    <span className="link">
                    <a href={void (0)} onClick={props.labelOnChangeCallback}>{props.labelLinkText}</a>
                </span>
                )}
            </label>
            {
                props.groupIcon? <i className={`group-icon ${props.groupIcon}`}></i> : null
            }
            <input
                id={props.id}
                className={`input-box ${props.type === "file" ? "inp-file" : "input"} ${active} ${isError} ${disabledClass} ${props.inputClassName}`}
                placeholder={props.placeholder}
                accept={props.accept}
                type={inputType}
                value={props.value}
                onChange={props.onchangeCallback}
                onBlur={props.onBlur}
                autoComplete="off"
                name={props.inputName}
                ref={props.inputRef}
                multiple={isMultiple}
                maxLength={props.maxLength}
                disabled={props.disabled}
            />
            {props.requiredMessage ? (
                <span className="error-message">
                    {props.requiredMessageLabel}
                </span>
            ) : props.whiteSpace === false ? ''
                :
                (
                    ' '
                )
            }
            {props.type === "password" && (
                <span className="password-visiablity" onClick={passwordVisiablityClick}>
                    {
                        inputType === "password" || props?.value?.length === 0 ?
                            <i className="bi bi-eye-slash"></i>
                            : <i className="bi bi-eye"></i>
                    }
                </span>
            )}
        </div>

        </>
    )
}
export default InputField;