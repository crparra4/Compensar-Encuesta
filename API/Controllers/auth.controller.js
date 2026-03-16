import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { username, password ,email , celular } = req.body;

    try{
        const user_exists = await pool.query(
            'SELECT * FROM usuarioscompensar WHERE usuario = $1 OR mail = $2',
            [username, email]
        )

        if(user_exists.rows.length > 0){
            return res.status(401).json({ message: 'El usuario ya existe' });
        }

        const salRounds = 10;
        const hashedPassword = await bcrypt.hash(password, salRounds);

        const result = await pool.query(
            'INSERT INTO usuarioscompensar (usuario, contraseña, mail, celular) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hashedPassword, email, celular]
        );
        
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: result.rows[0] });

    }catch(error){
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


export const login = async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await pool.query(
            'SELECT * FROM usuarioscompensar WHERE usuario = $1 OR mail = $2',
            [username, username]
        );

        if(user.rows.length === 0){
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const validpassword = await bcrypt.compare(password, user.rows[0].contraseña);
        if(!validpassword){
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Login exitoso' , rol: user.rows[0].rol , user_id: user.rows[0].id , username: user.rows[0].usuario });
        



    }catch(error){
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }   
}




