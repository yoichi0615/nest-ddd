import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">tumiageアプリ</h1>
      <div className="space-x-4">
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ログイン
        </Link>
        <Link href="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          新規登録
        </Link>
      </div>
    </main>
  )
}