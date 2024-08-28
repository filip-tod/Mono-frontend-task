export const formatUrl = (endpoint: string, id?: string, method: 'GET' | 'POST' | 'DELETE' = 'GET') => {
    let url = `${endpoint}`;

    if (id) {
        url += `/${id}`;
    }

    // dodamo .json samo za GET i POST zahteve
    if (method === 'GET' || method === 'POST') {
        url += '.json';
    }

    return url;
};