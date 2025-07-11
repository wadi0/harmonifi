import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button.scss";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Button = (props) => {
  return (
    <button
        type= {props.type !== undefined ? props.type : "submit"}
        ref={props.inputRef}
        onClick={props.onClickCallback}
        className={`button-1 ${props.btnClassName}`}
        disabled={props.isLoading || props.disabled}
        
    >
      {props.isLoading && (<FontAwesomeIcon className="load-spinner" icon={faSpinner} spin />)}
        {props.btnText}
        
    </button>
  )
}

export default Button
