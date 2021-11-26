import jwt from 'jsonwebtoken'
const TokenValidate = () => {

    const token = localStorage.getItem('token');
    if(!token){
        return false
    }
    try {
        const { exp } = jwt.decode(token);
        console.log(exp)
        if (Date.now() >= exp * 1000) {
            return false;
        }
    } catch (err) {
        console.log(err)
        return false;
    }
    return true;

}

export default TokenValidate