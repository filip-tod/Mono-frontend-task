import {IServiceButtonProps} from "../interfaces/IServiceButtonProps.ts";

const ServiceButton = ({ icon, text, onClick }: IServiceButtonProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            className="relative flex items-center justify-center p-3 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-800"
        >
            <img src={icon} alt="service-icon" className="w-6 h-6 mr-2"/>
            <span>{text}</span>
        </div>
    );
};

export default ServiceButton;