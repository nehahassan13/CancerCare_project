export const saveAuth = (token, role) => {
  try {
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('authTimestamp', Date.now().toString());
    
   
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userRole', role);
    
    console.log('Auth data saved successfully');
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};


export const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};


export const getRole = () => {
  return localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
};


export const isAuthenticated = () => {
  return !!getToken();
};


export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('authTimestamp');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userRole');
  console.log('Auth data cleared');
};


export const isTokenValid = (maxAgeHours = 24) => {
  const timestamp = localStorage.getItem('authTimestamp');
  if (!timestamp) return false;
  
  const tokenAge = Date.now() - parseInt(timestamp);
  const maxAgeMs = maxAgeHours * 60 * 60 * 1000;
  
  return tokenAge < maxAgeMs;
};