import { signup } from "../../api/auth";
import AuthForm from "../../components/AuthForm"
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = async (formData: { email: string; password: string }) => {
        try {
            await signup(formData.email, formData.password);
            navigate('/');
            return "Signup success";
        } catch (error) {
            console.error("Signup failed:", error);
            return "Signup failed";
        }
    };


  return (
    <AuthForm formType="signup" onSubmit={handleSignup} />
  )
}

export default Signup
