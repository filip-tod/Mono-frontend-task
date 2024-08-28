import { useState, useEffect } from "react";
import axios from "axios";
import { IModalProps } from "../../../interfaces/IModalProps";

export const MakersModal = ({ isOpen, onClose, itemId, endpoint, onSuccess }: IModalProps) => {
    const [formData, setFormData] = useState({ Name: '', Abrv: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (itemId) {
            axios.get(`${endpoint}/${itemId}.json`).then(response => {
                setFormData(response.data);
            }).catch(error => {
                setError("Error fetching data");
                console.error(error);
            });
        } else {
            setFormData({ Name: '', Abrv: '' });
        }
    }, [itemId, endpoint]);

    const handleSubmit = async () => {
        try {
            if (itemId) {
                await axios.put(`${endpoint}/${itemId}.json`, formData);
            } else {
                const response = await axios.post(`${endpoint}.json`, formData);
                const newId = response.data.name; // Firebase returns the new ID here
                await axios.patch(`${endpoint}/${newId}.json`, { Id: newId });
            }
            onSuccess();
            onClose();
        } catch (error) {
            setError("Error saving data");
            console.error(error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>{itemId ? 'Edit' : 'Add'} Item</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.Name}
                    onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Abrv"
                    value={formData.Abrv}
                    onChange={(e) => setFormData({ ...formData, Abrv: e.target.value })}
                />
                <button onClick={handleSubmit}>{itemId ? 'Update' : 'Create'}</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};
