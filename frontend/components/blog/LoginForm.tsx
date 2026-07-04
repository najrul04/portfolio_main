'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { LOGIN } from '@/lib/graphql/mutations';
import { useAuth } from '@/lib/auth-context';

interface LoginResult {
   login: {
      token: string;
      email: string;
   } | null;
}

// Standalone login form. Used on /admin when the user isn't authenticated yet.
// Why not a modal: the entire admin page is unusable without auth, so a full
// form is cleaner than gating every action with a popup.
const LoginForm = () => {
   const { login } = useAuth();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [errorMsg, setErrorMsg] = useState<string | null>(null);

   const [doLogin, { loading }] = useMutation<LoginResult>(LOGIN, {
      onCompleted: (data) => {
         if (data?.login?.token) {
            login(data.login.token, data.login.email);
            setErrorMsg(null);
         }
      },
      onError: (err) => {
         // The backend returns a generic "Invalid email or password" — surface it
         // verbatim. Why generic: never reveal which of the two was wrong (prevents
         // email enumeration).
         setErrorMsg(err.message || 'Login failed. Please try again.');
      },
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMsg(null);
      doLogin({ variables: { email, password } });
   };

   return (
      <form className="login_form" onSubmit={handleSubmit}>
         <h3>Admin Login</h3>
         <p className="text-light login_form_hint">
            Only authorized accounts can sign in here.
         </p>

         <label className="blog_field">
            <span>Email</span>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               autoComplete="email"
               autoFocus
               disabled={loading}
            />
         </label>

         <label className="blog_field">
            <span>Password</span>
            <div className="login_password_wrap">
               <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={loading}
               />
               {/*
                  type="button" is critical — otherwise clicking the eye submits the form.
                  aria-label changes with state so screen readers announce the action.
               */}
               <button
                  type="button"
                  className="login_password_toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
               >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
               </button>
            </div>
         </label>

         {errorMsg && <div className="login_form_error">{errorMsg}</div>}

         <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
         </button>
      </form>
   );
};

export default LoginForm;
