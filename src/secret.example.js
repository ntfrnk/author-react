
export const api_data = {
    url: 'http://api.frankoca.com.ar/v3/',
    getToken: () => {
        return localStorage.getItem('token') ?? null;
    }
}