"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import  Link  from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signIn, signUp } from '@/lib/actions/auth.action'
import { auth } from '@/firebase/client'


const authFormScheme = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}

const AuthForm = ({ type }: {type: FormType}) => {

    const formSchema = authFormScheme(type);
    const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
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
            {!isSignIn && (
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
              <FormField control={form.control}
                          name = "password"
                          label = "Password"
                          placeholder='Enter your password'
                          type='password' />
              
              {isSignIn && 
              <p className='text-black px-3 text-sm'>Forgot Password?
              <Link href='/landing/sign-in/forgot-password' className='font-semibold text-[#ff1010] hover:text-[#ad5555]'>  Reset Password here</Link>
              </p>  
              }
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