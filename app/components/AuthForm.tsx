"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import  Link  from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signIn, signUp } from '@/lib/actions/auth.action'
import { auth } from '@/firebase/client'
import { useState, useEffect } from 'react'


const authFormScheme = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: type === 'sign-up' 
      ? z.string()
          .min(6, { message: "Password must be at least 6 characters" })
          .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
          .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
          .regex(/[0-9]/, { message: "Password must contain at least one number" })
          .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
      : z.string().min(3)
  })
}

// Password strength indicator component
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const checks = [
    { label: "At least 6 characters", regex: /.{6,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character, Eg: !, @, $, %, ^, &, *", regex: /[^A-Za-z0-9]/ },
  ];

  return (
    <div className="mt-2">
      <p className="text-xs font-medium mb-1 text-gray-700">Password requirements:</p>
      <div className="space-y-1">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${check.regex.test(password) ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className={`text-xs font-medium ${check.regex.test(password) ? 'text-[hsl(112,100%,50%)]' : 'text-red-500'}`}>
              {check.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthForm = ({ type }: {type: FormType}) => {
    const formSchema = authFormScheme(type);
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  // Defining the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
  
  // Watch for password changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.password) {
        setPassword(value.password);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Defining a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
       if(type === 'sign-up'){

          const { name, email, password} = values;  

          const userCredentials = await createUserWithEmailAndPassword(auth , email, password)

          const result = await signUp({
            uid: userCredentials.user.uid,
            name: name!,
            email,
            password,
          })

          if(!result?.success){
            toast.error(result?.message);
            return;
          }

          toast.success('Account created successfully. Please sign.in');
          router.push('/landing/sign-in')
       } else {
          const { email, password} = values;

          const userCredential = await signInWithEmailAndPassword(auth, email, password);

          const idToken = await userCredential.user.getIdToken();

          if(!idToken){
            toast.error('Sign in failed')
            return;
          }

          await signIn({
            email, idToken
          })

          toast.success('Signed in successfully.');
          router.push('/')
       }
    } catch(error){
      console.error();
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === "sign-in";
  const isSignUp = type === "sign-up";

  return (
    <div className='auth-layout'>
    <div className='card-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-5 card py-10 px-10'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-row gap-1 justify-center'>
            <Image src="/logo4.svg" alt="logo" height={50} width={48} />
            <h1 className='text-black'>PrepIt</h1>
          </div>
          <div>
              <p className='under-root-logo'>#1 AI-Powered Interview preparation tool</p>
            </div>
        </div>
        <h3 className='text-black'>Practice job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7 mt-4 form">
            {type === 'sign-up' && (
              <FormField control={form.control}
                        name = "name"
                        label = "Name"
                        placeholder='Your Name' />
            )}
            <FormField  control={form.control}
                        name = "email"
                        label = "Email"
                        placeholder='Your email address'
                        type='email' />
            
            <div className='flex flex-col gap-1.5'>
              <FormItem>
                <FormLabel className='label'>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className='input pr-10'
                      placeholder='Enter your password'
                      type={showPassword ? 'text' : 'password'}
                      {...form.register("password")}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <span className="text-xs font-medium text-[#ff8000] pr-2.5 ">Hide</span>
                    ) : (
                      <span className="text-xs font-medium text-[#0061fd] pr-2.5 ">Show</span>
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
              
              {isSignIn && 
              <p className='text-black px-3 text-sm'>Forgot Password?
              <Link href='/landing/sign-in/forgot-password' className='font-semibold text-[#ff1010] hover:text-[#ad5555]'>  Reset Password here</Link>
              </p>  
              }
              
              {type === 'sign-up' && password && <PasswordStrengthIndicator password={password} />}
            </div>

            <Button className='btn' type="submit">{isSignIn ? "Sign in" : "Create an Account"}</Button>
          </form>
        </Form>

        <p className='text-center text-black'>
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link href={!isSignIn ? '/landing/sign-in' : '/landing/sign-up'} className='font-bold hover:!text-[#333333] text-user-primary ml-1'>
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>

  </div>
  </div>
  </div>
  )
}

export default AuthForm