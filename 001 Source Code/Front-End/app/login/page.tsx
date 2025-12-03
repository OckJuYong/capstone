"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !password) {
      toast({
        title: "로그인 실패",
        description: "아이디와 비밀번호를 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    // Simulate login
    login(id)
    router.push("/onboarding/welcome")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="w-64 h-32 flex items-center justify-center mb-10">
        <div className="text-4xl font-bold text-purple-600">MobiSync</div>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 bg-transparent"
          />
          <Input
            type="password"
            placeholder="PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 bg-transparent"
          />
        </div>

        <div className="flex justify-center space-x-8">
          <button
            type="button"
            className={`pb-1 ${activeTab === "login" ? "border-b-2 border-purple-600 font-medium text-purple-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("login")}
          >
            로그인
          </button>
          <Link
            href="/signup"
            className={`pb-1 ${activeTab === "signup" ? "border-b-2 border-purple-600 font-medium text-purple-700" : "text-gray-500"}`}
          >
            회원가입
          </Link>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400"
            onClick={() => {
              toast({
                title: "카카오 로그인",
                description: "카카오 로그인 기능이 구현되었습니다.",
              })
              login("kakao_user")
              router.push("/onboarding/welcome")
            }}
          >
            카카오 로그인하기
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-black border-gray-300"
            onClick={() => {
              toast({
                title: "구글 로그인",
                description: "구글 로그인 기능이 구현되었습니다.",
              })
              login("google_user")
              router.push("/onboarding/welcome")
            }}
          >
            구글 로그인하기
          </Button>
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          로그인
        </Button>
      </form>
    </div>
  )
}
