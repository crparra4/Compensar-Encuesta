const API_URL ="http://localhost:4000/auth";


export const loginService = async(identification, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username:identification, 
                password:password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;

    }catch (error) {
        console.error('Error during login:', error);
        throw error;
    }        
}

export const registerService = async (email, username, phone, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 username : username ,
                 password : password ,
                 email : email ,
                 celular : phone,               
                })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}


export const checkPasswordStrength = (password) => {
let strength = 0;
  if (password.length >= 8) strength++; 
  if (/[A-Z]/.test(password)) strength++; 
  if (/[0-9]/.test(password)) strength++; 
  if (/[^A-Za-z0-9]/.test(password)) strength++; 
  return strength;
}
