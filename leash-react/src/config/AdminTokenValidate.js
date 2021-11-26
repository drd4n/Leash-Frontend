import jwt from 'jsonwebtoken'
const AdminTokenValidate = () => {

    const token = localStorage.getItem('admintoken');
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

export default AdminTokenValidate