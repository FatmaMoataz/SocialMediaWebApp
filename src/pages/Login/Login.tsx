import { NavLink } from "react-router-dom";
import { FaGoogle, FaTwitter } from "react-icons/fa"
import { motion } from "framer-motion"

export default function Example() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <motion.div 
        initial={{ opacity: 0, x: -50 }}     
        animate={{ opacity: 1, x: 0 }}     
        transition={{ duration: 0.9 }}        
        className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1
          className="mt-10 text-center text-5xl font-semibold tracking-tight text-gray-900">
            Hello Again!
          </h1>
         <p className="mt-1 text-center tracking-tight text-gray-500">
           Sign in to your account
          </p>
        </motion.div>

        <motion.div 
        initial={{ opacity: 0 }}     
        animate={{ opacity: 1}}     
        transition={{ duration: 0.9 }}        
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-300 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-300 sm:text-sm/6"
                />
              </div>
            </div>
<NavLink to={''} className='text-main underline'>Forgot your Password?</NavLink>
            <div>
              <button
                type="submit"
                className="flex cursor-pointer w-full justify-center rounded-md bg-main px-3 py-3 mt-11 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center my-5">
  <div className="flex-grow border-t border-gray-300"></div>
  <span className="mx-4 text-gray-500">Or with</span>
  <div className="flex-grow border-t border-gray-300"></div>
</div>

       <div>
              <motion.button
               whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
                className="flex w-full cursor-pointer border-2 border-gray-200 justify-center rounded-md px-3 py-3 mt-6 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
            <FaGoogle className="w-5 h-5 text-black me-4" />
                Sign in with Google 
              </motion.button>
            </div>

         <div>
              <motion.button
       whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
                className="flex w-full cursor-pointer border-2 border-gray-200 justify-center rounded-md px-3 py-3 mt-6 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
            <FaTwitter className="w-5 h-5 text-black me-4" />
                Sign in with Twitter 
              </motion.button>
            </div>  
    
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account? Let's{' '}
            <NavLink to={""} className="font-semibold text-main">
              Sign up
            </NavLink>
          </p>
        </motion.div>
      </div>
    </>
  )
}
