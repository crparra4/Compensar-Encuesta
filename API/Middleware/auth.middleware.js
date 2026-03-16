

// en desarrollo por implementar 
//*export const verificacionToken = (req, res, next) => {
//*    const authHeader = req.headers.authorization;

//*    if(!authHeader){
//*        return res.status(401).json({ message: 'Acceso no autorizado' });
//*    }

 //*   const token = authHeader.split(' ')[1];

 //*   try{
//*        const decoded = jwt.verify(token, process.env.JWT_SECRET);
 //*       req.user = decoded;
 //* 
 //       next();
    
 //*   }


