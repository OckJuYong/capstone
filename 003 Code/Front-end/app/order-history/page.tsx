"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export default function OrderHistoryPage() {
  const router = useRouter()

  const [orders] = useState([
    {
      id: 1,
      restaurantName: "중범이만 레벨업",
      date: "2023-04-10",
      time: "18:30",
      items: [
        { name: "메뉴 1", quantity: 1, price: 12000, image: "/placeholder.svg?height=80&width=80" },
        { name: "메뉴 2", quantity: 1, price: 13000, image: "/placeholder.svg?height=80&width=80" },
      ],
      total: 28000,
      status: "배달완료",
    },
    {
      id: 2,
      restaurantName: "주용이는 개천재",
      date: "2023-04-05",
      time: "19:15",
      items: [{ name: "메뉴 1", quantity: 1, price: 18000, image: "/placeholder.svg?height=80&width=80" }],
      total: 22000,
      status: "배달완료",
    },
  ])

  const handleReviewWrite = (orderId: number) => {
    router.push(`/restaurant/${orderId}/review`)
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold text-center">주문내역</h1>
      </header>

      <div className="p-4">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg overflow-hidden border mb-4">
                <div className="p-3 border-b bg-gray-50">
                  <h2 className="font-medium">{order.restaurantName}</h2>
                  <p className="text-xs text-gray-500">
                    {order.date} {order.time} · {order.status}
                  </p>
                </div>

                <div className="p-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.price.toLocaleString()}원</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleReviewWrite(order.id)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        리뷰쓰기
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">총 결제금액</span>
                    <span className="font-bold">{order.total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">주문 내역이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 flex justify-between p-4 bg-white border-t max-w-md mx-auto">
        <button className="text-blue-500 font-medium">메뉴목록</button>
        <button className="text-blue-500 font-medium">주문내역</button>
      </div>

      <BottomNavigation />
    </div>
  )
}
