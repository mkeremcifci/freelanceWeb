import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ResetPasswordVerify(){
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const id = searchParams.get('id');

    console.log(token);


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password != confirmPassword){
            console.log("Parolalar uyuşmuyor");
            return;
        }  

        try{
            const response = await axios.post('http://localhost:3000/auth/verify-reset-password', {
                id,
                token,
                newPassword: password,
            });
            console.log(response);
            console.log("Parola başarılı bir şekilde değiştirildi");
        }
        catch(error){
            console.error(error);
        }
    };

    return(
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h2>Yeni Şifre Belirle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Yeni Şifre:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Yeni Şifre (Tekrar):</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                </div>
                <button type="submit">Şifreyi Güncelle</button>
            </form>
        </div>
    )
}

export default ResetPasswordVerify;