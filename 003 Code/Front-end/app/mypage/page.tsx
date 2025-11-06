"use client"

import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Settings, ChevronRight, CreditCard, Gift, Bell, HelpCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function MyPage() {
  const router = useRouter()
  const { logout, user } = useAuth()

  const menuItems = [
    {
      id: "coupon",
      name: "쿠폰함",
      description: "사용 가능한 쿠폰 0장",
      path: "/mypage/coupons",
      icon: <Gift className="h-5 w-5 text-purple-600" />,
    },
    {
      id: "notice",
      name: "공지사항",
      description: "앱 업데이트 및 공지사항을 확인하세요",
      path: "/mypage/notices",
      icon: <Bell className="h-5 w-5 text-purple-600" />,
    },
    {
      id: "event",
      name: "이벤트",
      description: "진행 중인 이벤트를 확인하세요",
      path: "/mypage/events",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
    },
    {
      id: "support",
      name: "고객센터",
      description: "문의사항이 있으신가요?",
      path: "/mypage/support",
      icon: <HelpCircle className="h-5 w-5 text-purple-600" />,
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">마이페이지</h1>
        <button onClick={() => router.push("/mypage/settings")}>
          <Settings className="h-5 w-5" />
        </button>
      </header>

      <div className="p-4 bg-purple-50">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-purple-700">{user ? user.charAt(0).toUpperCase() : "G"}</span>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium">{user || "게스트"}</h2>
            <button className="text-sm text-purple-600 mt-1" onClick={() => router.push("/mypage/profile")}>
              프로필 관리
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg border"
              onClick={() => router.push(item.path)}
            >
              <div className="flex items-center">
                <div className="mr-3">{item.icon}</div>
                <div className="text-left">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>

        <button className="w-full text-center text-gray-500 mt-8 p-4" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <BottomNavigation />
    </div>
  )
}
