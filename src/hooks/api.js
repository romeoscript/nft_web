// api.js
export async function registerUser(userData) {
    const response = await fetch('https://nftapi-production-405a.up.railway.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        // Attempt to read the error message from the response, fallback to a default message
        const errorBody = await response.text();
        try {
            const errorData = JSON.parse(errorBody);
            throw new Error(errorData.message || 'Unknown error occurred during registration.');
        } catch {
            const errorData = JSON.parse(errorBody);
            throw new Error(errorData.message || 'Unknown error occurred during registration.');
        }
    }

    return response.json();
}

export async function loginUser(userData) {
    const response = await fetch('https://nftapi-production-405a.up.railway.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        // Attempt to read the error message from the response, fallback to a default message
        const errorBody = await response.text();
        try {
            const errorData = JSON.parse(errorBody);
         
            throw new Error(errorData.message || 'Unknown error occurred during login.');
        } catch {
            const errorData = JSON.parse(errorBody);
            throw new Error(errorData.message || 'Unknown error occurred during login.');
        }
    }

    return response.json();
}
