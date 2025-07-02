import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ResetPasswordVerify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ text: '', type: '' });

    if (password !== confirmPassword) {
      setFeedback({ text: 'Parolalar uyuşmuyor.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/verify-reset-password',
        {
          id,
          token,
          newPassword: password,
        }
      );
      console.log(response);
      setFeedback({ text: 'Parola başarılı bir şekilde değiştirildi.', type: 'success' });
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      setFeedback({ text: errMsg, type: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Yeni Şifre Belirle</h2>

      {feedback.text && (
        <div
          style={{
            marginBottom: '1rem',
            color: feedback.type === 'error' ? 'red' : 'green',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Yeni Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Yeni Şifre (Tekrar):</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.6rem',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordVerify;
