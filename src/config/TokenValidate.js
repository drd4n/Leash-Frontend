import jwt from 'jsonwebtoken'
const AuthValidate = class {
    constructor(){
        
    }

    isAuth () {
        const token = localStorage.getItem('token');
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
}

export default AuthValidate