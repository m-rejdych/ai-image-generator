import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AuthForm from '@/components/AuthForm';
import { login } from '@/services/auth';

const tryLogin = async () => {
  const cookieStore = cookies();
  const apiKey = cookieStore.get('apiKey') ;

  if (!apiKey) return false;

  try {
    return await login(apiKey.value);
  } catch {
    return false;
  }
};

export default async function Home() {
  const isLoggedIn = await tryLogin();

  if (isLoggedIn) {
    redirect('/app');
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-100">
          Enter your API key
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
