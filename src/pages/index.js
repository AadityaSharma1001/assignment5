import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Bus Pass Booking System</h1>
      
      <Link href="/auth/signup" className="btn">
        Sign Up
      </Link>

      <Link href="/auth/login" className="btn ml-4">
        Log In
      </Link>
    </div>
  );
}

