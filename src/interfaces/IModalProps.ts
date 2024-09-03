export interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemId?: string;
    endpoint: string;
    onSuccess: () => void;
}