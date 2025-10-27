import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SplashPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="w-64 h-64 flex items-center justify-center mb-12">
        <div className="relative">
          <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-5xl font-bold text-white">M</span>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md">
            <span className="text-xl font-bold text-purple-600">MobiSync</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-purple-800 mb-2">맛있는 여정을 시작하세요</h1>
        <p className="text-gray-600">당신의 입맛에 맞는 음식을 추천해드립니다</p>
      </div>

      <Link href="/login" className="w-full max-w-xs">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12 rounded-xl">시작하기</Button>
      </Link>
    </div>
  )
}
