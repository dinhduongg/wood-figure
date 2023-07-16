import SignInForm from './components/signIn-form'

export const metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập',
}

export default function SignIn() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <SignInForm />
    </section>
  )
}
