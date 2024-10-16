"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useAuth()
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("response");

        e.preventDefault();

        const apiUrl = "http://localhost:3000/api/v1/auth/login";

        try {
            console.log("リクエスト送信中...");
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // ログイン情報をJSONで送信
            });

            if (!response.ok) {
                throw new Error("ログインに失敗しました"); // ステータスコードが200以外ならエラー
            }

            const data = await response.json(); // レスポンスデータをJSONとして取得
            console.log(data, 'DATA');
            setToken(data)
            router.push('/dashboard')
        } catch (error) {
            console.error("エラー:", error); // エラーハンドリング
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">ログイン</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        パスワード
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        ログイン
                    </button>
                    <Link
                        href="/forgot-password"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        パスワードを忘れた場合
                    </Link>
                </div>
            </form>
            <p className="mt-4">
                アカウントをお持ちでない方は
                <Link
                    href="/register"
                    className="text-blue-500 hover:text-blue-800"
                >
                    こちら
                </Link>
            </p>
        </div>
    );
}
