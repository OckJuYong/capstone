"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CouponsPage() {
  const router = useRouter()
  const [coupons] = useState([
    {
      id: 1,
      name: "신규 가입 쿠폰",
      discount: "3,000원",
      minOrder: "15,000원 이상",
      expiry: "2023-12-31",
      isUsed: false,
    },
    {
      id: 2,
      name: "첫 주문 할인",
      discount: "5,000원",
      minOrder: "20,000원 이상",
      expiry: "2023-12-31",
      isUsed: false,
    },
    {
      id: 3,
      name: "생일 축하 쿠폰",
      discount: "10,000원",
      minOrder: "30,000원 이상",
      expiry: "2023-12-31",
      isUsed: false,
    },
    {
      id: 4,
      name: "리뷰 작성 쿠폰",
      discount: "2,000원",
      minOrder: "10,000원 이상",
      expiry: "2023-11-30",
      isUsed: true,
    },
  ])

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">쿠폰함</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4">
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <p className="text-center font-medium text-purple-700">
            사용 가능한 쿠폰 {coupons.filter((c) => !c.isUsed).length}장
          </p>
        </div>

        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`border rounded-lg p-4 ${coupon.isUsed ? "bg-gray-100 opacity-70" : "bg-white"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{coupon.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{coupon.minOrder} 주문 시</p>
                  <p className="text-xs text-gray-500 mt-2">유효기간: ~{coupon.expiry}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600 text-lg">{coupon.discount}</p>
                  {coupon.isUsed ? (
                    <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full mt-2">
                      사용완료
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mt-2">
                      사용가능
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
