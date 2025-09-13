import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { signupSchema, type SignupForm } from "../../validation/signupSchema";
import { signup } from "../../redux/slices/authSlice";

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupForm) => {
    dispatch(signup(data));
  };

  useEffect(() => {
    if (user) {
      toast.success("Signed up successfully");
      navigate("/login");
    }
    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <h1 className="mt-10 text-center text-5xl font-semibold tracking-tight text-gray-900">
          Welcome!
        </h1>
        <p className="mt-1 text-center tracking-tight text-gray-500">
          Sign up to your account
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="name"
                    {...register("name")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-300 sm:text-sm"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-300 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-300 sm:text-sm"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-main px-3 py-3 mt-11 text-sm font-semibold text-white shadow focus-visible:outline-2"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="flex items-center my-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex w-full border-2 border-gray-200 justify-center rounded-md px-3 py-3 mt-6 text-sm font-semibold shadow"
            >
              <FaGoogle className="w-5 h-5 text-black me-4" />
              Sign up with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex w-full border-2 border-gray-200 justify-center rounded-md px-3 py-3 mt-6 text-sm font-semibold shadow"
            >
              <FaTwitter className="w-5 h-5 text-black me-4" />
              Sign up with Twitter
            </motion.button>
          </>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <NavLink to={"/login"} className="font-semibold text-main">
            Sign in
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}
