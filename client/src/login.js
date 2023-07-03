import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    function toSignup() {
        navigate("/signup");
    }

    return (
      <div>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Login</button>
        <a onClick={() => {
            toSignup();
        }}>Create Account</a>
      </div>
    );
  }
  
  export default Login;