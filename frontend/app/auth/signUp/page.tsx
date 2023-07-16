import SignUpForm from './components/signUp-form'

export const metadata = {
  title: 'Đăng ký',
  description: 'Đăng ký',
}

export default function SignUp() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <SignUpForm />
    </section>
  )
}
