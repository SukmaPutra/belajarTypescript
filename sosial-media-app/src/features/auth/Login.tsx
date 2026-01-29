import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import AuthForm from "../../components/AuthForm"


const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData: { email: string; password: string }) => {
        try {
            await login(formData.email, formData.password);
            navigate('/');
            return "Login success";
        } catch (error) {
            console.error("Login failed:", error);
            return "Login failed";
        }
    };


  return (
    <AuthForm formType="login" onSubmit={handleLogin} />
  )
}

export default Login
