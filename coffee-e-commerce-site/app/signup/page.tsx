import type { Metadata } from 'next'
import { SignupForm } from '@/components/auth/signup-form'

export const metadata: Metadata = {
  title: 'Sign Up | Ember & Brew',
  description: 'Create your Ember & Brew account.',
}

export default function SignupPage() {
  return <SignupForm />
}
