"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-b from-purple-50 to-white">
      <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mb-8">
        <span className="text-4xl font-bold text-purple-600">M</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-2 text-purple-800">환영합니다</h1>
        <p className="text-lg mb-8 text-purple-600">MobiSync와 함께 맛있는 여정을 시작하세요</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-xs"
      >
        <p className="mb-8 text-gray-600">사용자 입맛을 설정하여 맞춤형 음식 추천을 받아보세요.</p>

        <div className="w-full space-y-4">
          <Button
            onClick={() => router.push("/onboarding/taste-preferences")}
            className="w-full bg-purple-600 hover:bg-purple-700 h-12 rounded-xl"
          >
            시작하기
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/home")}
            className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 h-12 rounded-xl"
          >
            건너뛰기
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          <div className="w-2 h-2 rounded-full bg-purple-200"></div>
          <div className="w-2 h-2 rounded-full bg-purple-200"></div>
        </div>
      </div>
    </div>
  )
}
