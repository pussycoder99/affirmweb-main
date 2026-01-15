import { createContext, useContext, useState, useEffect } from 'react';
import { whmcs } from './whmcs';

const WHMCSAuthContext = createContext({});

export const useWhmcsAuth = () => useContext(WHMCSAuthContext);

export function WHMCSAuthProvider({ children }) {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session mock
        const savedClient = localStorage.getItem('whmcs_client');
        if (savedClient) {
            setClient(JSON.parse(savedClient));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await whmcs.validateLogin(email, password);
            if (response.result === 'success') {
                const clientData = { id: response.userid, email };
                setClient(clientData);
                localStorage.setItem('whmcs_client', JSON.stringify(clientData));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (data) => {
        try {
            const response = await whmcs.createClient(data);
            if (response.result === 'success') {
                const clientData = { id: response.userid, email: data.email };
                setClient(clientData);
                localStorage.setItem('whmcs_client', JSON.stringify(clientData));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setClient(null);
        localStorage.removeItem('whmcs_client');
    };

    return (
        <WHMCSAuthContext.Provider value={{ client, login, signup, logout, loading }}>
            {children}
        </WHMCSAuthContext.Provider>
    );
}
