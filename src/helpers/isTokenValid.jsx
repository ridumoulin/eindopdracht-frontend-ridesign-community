import {jwtDecode} from "jwt-decode";

function isTokenValid(token) {
    try {
        console.log("Token:", token);
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}

export default isTokenValid;