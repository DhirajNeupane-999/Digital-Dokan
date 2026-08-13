import * as jwt from 'jsonwebtoken';
const generateToken = (userid: string) => {
    // Generate token jwt 
    const token = jwt.sign(
        { id: userid },
        process.env.JWT_SECRET as any,
        { expiresIn: process.env.jwt_expires_in as any },
    );
    return token;
} 


export default generateToken; 