import {IServiceButtonProps} from "../interfaces/IServiceButtonProps.ts";


const ServiceButton = ({ icon, text, endpoint, onClick }: IServiceButtonProps) => {
    const handleClick = () => {
        console.log(`Authenticating with: ${endpoint}`);
        if (onClick) {
            onClick();
        } else {
            window.location.href = endpoint; // Preusmjeravanje na endpoint
        }
    };


    return (
        <div
            onClick={handleClick}
            className="relative flex items-center justify-center p-3 bg-blue-600 text-white rounded cursor-pointer"
        >
            <img src={icon} alt="service-icon" className="w-6 h-6" />

            <span
                className="absolute left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
                {text}
            </span>
        </div>
    );
};

export default ServiceButton;