import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { signIn, signUp, confirmSignUp, resetPassword } from 'aws-amplify/auth';

// Styled components
const AuthCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: '100%',
  backgroundColor: 'rgba(40, 40, 40, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(100, 255, 218, 0.1)',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    '& fieldset': {
      borderColor: 'rgba(100, 255, 218, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: '#10B981',
      boxShadow: '0 0 8px #64ffda',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#EC4899',
      boxShadow: '0 0 8px #EC4899',
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#EC4899',
    }
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#10B981',
  borderRadius: '8px',
  padding: '12px',
  '&:hover': {
    backgroundColor: '#059669',
    boxShadow: '0 0 12px #64ffda',
  },
  '&:active': {
    backgroundColor: '#047857',
    boxShadow: '0 0 16px #EC4899',
  }
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#64ffda',
  cursor: 'pointer',
  '&:hover': {
    color: '#EC4899',
    textShadow: '0 0 8px #EC4899',
  }
}));

type AuthMode = 'signIn' | 'signUp' | 'confirmSignUp' | 'forgotPassword';

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      switch (mode) {
        case 'signIn':
          await signIn({ username: email, password });
          break;
        case 'signUp':
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }
          await signUp({
            username: email,
            password,
            options: {
              userAttributes: {
                email
              }
            }
          });
          setMode('confirmSignUp');
          break;
        case 'confirmSignUp':
          await confirmSignUp({
            username: email,
            confirmationCode: code
          });
          setMode('signIn');
          break;
        case 'forgotPassword':
          await resetPassword({ username: email });
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        background: 'linear-gradient(135deg, #2d2d2d, #353535)',
      }}
    >
      <AuthCard>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img 
            src="/logo.svg" 
            alt="Logo" 
            style={{ width: 60, height: 60, marginBottom: 16 }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#ffffff',
              mb: 1,
              fontSize: '28px',
              fontWeight: 'bold',
              fontFamily: '"Roboto", "Arial", sans-serif',
              textShadow: '0 0 10px rgba(100, 255, 218, 0.5)',
              letterSpacing: '2px',
            }}
          >
            {import.meta.env.VITE_APP_NAME || 'Case Flow'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {mode === 'signIn' ? 'Sign in to your account' : 
             mode === 'signUp' ? 'Create a new account' :
             mode === 'confirmSignUp' ? 'Confirm your account' :
             'Reset your password'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {mode !== 'confirmSignUp' && (
            <FormField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          )}

          {(mode === 'signIn' || mode === 'signUp') && (
            <FormField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { color: '#64ffda' }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {mode === 'signUp' && (
            <FormField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { color: '#64ffda' }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {mode === 'confirmSignUp' && (
            <FormField
              label="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
              required
            />
          )}

          <SubmitButton
            type="submit"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {mode === 'signIn' ? 'Sign In' :
             mode === 'signUp' ? 'Sign Up' :
             mode === 'confirmSignUp' ? 'Verify' :
             'Reset Password'}
          </SubmitButton>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {mode === 'signIn' ? (
            <>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                Don't have an account?{' '}
                <StyledLink onClick={() => setMode('signUp')}>
                  Sign up
                </StyledLink>
              </Typography>
              <StyledLink onClick={() => setMode('forgotPassword')}>
                Forgot password?
              </StyledLink>
            </>
          ) : (
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Already have an account?{' '}
              <StyledLink onClick={() => setMode('signIn')}>
                Sign in
              </StyledLink>
            </Typography>
          )}
        </Box>
      </AuthCard>
    </Box>
  );
}; 