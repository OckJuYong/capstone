"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    pushNotifications: true,
    marketingNotifications: false,
    orderNotifications: true,
    reviewNotifications: true,
    darkMode: false,
    locationServices: true,
    autoLogin: true,
  })

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }))

    toast({
      title: "설정 변경됨",
      description: "설정이 성공적으로 변경되었습니다.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">설정</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 flex-1">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">알림 설정</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="flex-1">
                  <div>푸시 알림</div>
                  <div className="text-sm text-gray-500">앱 푸시 알림을 받습니다</div>
                </Label>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle("pushNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-notifications" className="flex-1">
                  <div>마케팅 알림</div>
                  <div className="text-sm text-gray-500">프로모션 및 마케팅 알림을 받습니다</div>
                </Label>
                <Switch
                  id="marketing-notifications"
                  checked={settings.marketingNotifications}
                  onCheckedChange={() => handleToggle("marketingNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="order-notifications" className="flex-1">
                  <div>주문 알림</div>
                  <div className="text-sm text-gray-500">주문 상태 변경 알림을 받습니다</div>
                </Label>
                <Switch
                  id="order-notifications"
                  checked={settings.orderNotifications}
                  onCheckedChange={() => handleToggle("orderNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="review-notifications" className="flex-1">
                  <div>리뷰 알림</div>
                  <div className="text-sm text-gray-500">리뷰 관련 알림을 받습니다</div>
                </Label>
                <Switch
                  id="review-notifications"
                  checked={settings.reviewNotifications}
                  onCheckedChange={() => handleToggle("reviewNotifications")}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">앱 설정</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex-1">
                  <div>다크 모드</div>
                  <div className="text-sm text-gray-500">어두운 테마를 사용합니다</div>
                </Label>
                <Switch id="dark-mode" checked={settings.darkMode} onCheckedChange={() => handleToggle("darkMode")} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="location-services" className="flex-1">
                  <div>위치 서비스</div>
                  <div className="text-sm text-gray-500">현재 위치 기반 서비스를 사용합니다</div>
                </Label>
                <Switch
                  id="location-services"
                  checked={settings.locationServices}
                  onCheckedChange={() => handleToggle("locationServices")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-login" className="flex-1">
                  <div>자동 로그인</div>
                  <div className="text-sm text-gray-500">앱 실행 시 자동으로 로그인합니다</div>
                </Label>
                <Switch
                  id="auto-login"
                  checked={settings.autoLogin}
                  onCheckedChange={() => handleToggle("autoLogin")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="space-y-2">
          <Button variant="outline" className="w-full" onClick={() => router.push("/mypage/terms")}>
            이용약관
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/mypage/privacy")}>
            개인정보 처리방침
          </Button>
          <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  )
}
