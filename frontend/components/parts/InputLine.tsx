import React from "react";
import UserSVG from "../utils/svg/User";
import PasswordSVG from "../utils/svg/Password";
import EmailSVG from "../utils/svg/Email";

interface InputLineInterface {
    icon?: string,
    placeholder?: string,
    type: string,
    name: string,
    classes?: string,
    wrapperClasses?: string,
    value?: string,
    handleOnChange?: Function,
    handleClick?: Function,
    handleBlur?: Function,
    required?: boolean
}

class InputLine extends React.Component<InputLineInterface> {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes = '', wrapperClasses = '', name= 'input', type = 'text', icon = '', placeholder = '', value = '', handleOnChange = () => {}, handleClick = () => {}, handleBlur = () => {}, required = false} = this.props;
        const iconModifierClass = icon
        ? `o-input--${icon}`
        : '';

        let iconContent;

        switch(icon) {
            case 'user':
                iconContent = <UserSVG/>;
                break;
            case 'email':
                iconContent = <EmailSVG/>;
                break;
            case 'password':
                iconContent = <PasswordSVG/>;
                break;
            case 'letter':
                iconContent = <span className="o-input__icon-letter">{name[0].toUpperCase()}</span>;
                break;
            default:
                iconContent = '';
                break;
        };

        return (
            <div className={`o-input__line ${wrapperClasses}`}>
                {iconContent &&
                <div className="o-input__icon-container">
                    <div className="o-input__icon">
                        {iconContent}
                    </div>
                </div>}
                {type === "submit"
                    ? <input className={`o-input ${iconModifierClass} ${classes}`} type={type} name={name} placeholder={placeholder} value={value} onClick={e => handleClick(e)}/>
                    : <input
                        className={`o-input ${iconModifierClass} ${classes}`}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={e => handleOnChange(e)}
                        onClick={e => handleClick(e)}
                        onBlur={(e => handleBlur(e))}
                        required={required}
                    />
                }
            </div>
        );
    }
}

export default InputLine;
