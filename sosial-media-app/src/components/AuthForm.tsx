import { useActionState } from "react";
import { Link } from "react-router-dom";
import { authSchema } from "../type/schema/authSchema";
import {z} from "zod";

type AuthFormProps = {
  formType: "login" | "signup";
  onSubmit: (FormData: { email: string; password: string }) => Promise<string>;
};

const AuthForm = ({ formType, onSubmit }: AuthFormProps) => {
  const login = formType === "login";
  const [message, formAction, isPending] = useActionState(
    async ( _: any, formData: FormData) => {
        try {
            const data = {
                email: formData.get("email")?.toString() || "",
                password: formData.get("password")?.toString() || ""
            };
            authSchema.parse(data); // Validate form data
            return await onSubmit(data);
        } catch (error) {
            if(error instanceof z.ZodError){
                return error.issues.map((err: { message: any; }) => err.message).join(", ");
        }
            return "An unexpected error occurred.";
        }
    }, null
  )
  

  return (
    <section
      style={{ backgroundImage: "url('https://i.pinimg.com/1200x/b4/ae/5e/b4ae5e2e3a0009177b65c160dc3c95ef.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}
      className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
          Lets Connect With Us
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{login ? "Sign in to your account" : "Create an account"}</h1>
            <form className="space-y-4 md:space-y-6" action={formAction}>
              <div>
                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isPending? "submitting..." : (login ? "Login " : "Sign Up")}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {login ? "Don't have an account yet?" : "Already have an account?"}{" "}
                <Link to={login ? "/signup" : "/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  {login ? "Sign up" : "Login"}
                </Link>
              </p>
            </form>
            {message && <div className="text-red-500 mt-4">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
