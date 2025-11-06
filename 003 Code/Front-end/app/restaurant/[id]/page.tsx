"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Star, Heart, ArrowLeft, ShoppingCart, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const restaurantId = params.id

  const [restaurant] = useState({
    id: restaurantId,
    name: "메종 크림 파스타",
    category: ["파스타", "이탈리안"],
    rating: 4.8,
    reviewCount: 109,
    distance: "1.8km",
    address: "대전 유성구 학하서로 121-1",
    phone: "042-123-4567",
    hours: "10:00 - 22:00",
    minOrder: "15,000원",
    deliveryTime: "25-35분",
    deliveryFee: "3,000원",
    matchPercentage: 92, // Overall restaurant match percentage
    tasteFactors: {
      spicy: 80, // 매운맛
      sweet: 30, // 단맛
      salty: 60, // 짠맛
      sour: 20, // 신맛
      bitter: 10, // 쓴맛
      umami: 90, // 감칠맛
    },
    images: [
      "/placeholder.svg?height=200&width=400",
      "/placeholder.svg?height=200&width=400",
      "/placeholder.svg?height=200&width=400",
    ],
    menu: [
      {
        id: 1,
        name: "크림 파스타",
        price: 15000,
        image: "/placeholder.svg?height=100&width=100",
        description: "풍부한 크림 소스와 신선한 해산물이 어우러진 파스타",
        popular: true,
        matchPercentage: 95, // Menu item match percentage
        tasteFactors: {
          spicy: 20, // 매운맛
          sweet: 40, // 단맛
          salty: 60, // 짠맛
          sour: 10, // 신맛
          bitter: 5, // 쓴맛
          umami: 95, // 감칠맛
        },
      },
      {
        id: 2,
        name: "토마토 파스타",
        price: 14000,
        image: "/placeholder.svg?height=100&width=100",
        description: "상큼한 토마토 소스와 바질이 어우러진 파스타",
        matchPercentage: 88,
        tasteFactors: {
          spicy: 40, // 매운맛
          sweet: 30, // 단맛
          salty: 50, // 짠맛
          sour: 70, // 신맛
          bitter: 10, // 쓴맛
          umami: 85, // 감칠맛
        },
      },
      {
        id: 3,
        name: "트러플 리조또",
        price: 18000,
        image: "/placeholder.svg?height=100&width=100",
        description: "향긋한 트러플 향이 가득한 크리미한 리조또",
        popular: true,
        matchPercentage: 90,
        tasteFactors: {
          spicy: 10, // 매운맛
          sweet: 20, // 단맛
          salty: 65, // 짠맛
          sour: 5, // 신맛
          bitter: 15, // 쓴맛
          umami: 90, // 감칠맛
        },
      },
      {
        id: 4,
        name: "마르게리타 피자",
        price: 16000,
        image: "/placeholder.svg?height=100&width=100",
        description: "토마토 소스와 모짜렐라 치즈, 바질이 어우러진 정통 피자",
        matchPercentage: 85,
        tasteFactors: {
          spicy: 15, // 매운맛
          sweet: 35, // 단맛
          salty: 55, // 짠맛
          sour: 40, // 신맛
          bitter: 5, // 쓴맛
          umami: 80, // 감칠맛
        },
      },
    ],
    info: {
      notice: "매장 사정에 따라 배달 시간이 지연될 수 있습니다.",
      address: "대전 유성구 학하서로 121-1",
      hours: "10:00 - 22:00 (연중무휴)",
      phone: "042-123-4567",
    },
    reviewItems: [
      {
        id: 1,
        user: "사용자 1",
        rating: 5,
        content: "맛있어요! 배달도 빨라요",
        date: "2023-04-01",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        user: "사용자 2",
        rating: 4,
        content: "크림 파스타 정말 맛있습니다",
        date: "2023-03-15",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  })

  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; quantity: number }[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("menu")
  const [cartCount, setCartCount] = useState(2) // Simulating 2 items in cart
  const [showCartAnimation, setShowCartAnimation] = useState(false)
  const [addedItem, setAddedItem] = useState<{ name: string; price: number } | null>(null)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "찜 목록에서 제거됨" : "찜 목록에 추가됨",
      description: isFavorite
        ? `${restaurant.name}이(가) 찜 목록에서 제거되었습니다.`
        : `${restaurant.name}이(가) 찜 목록에 추가되었습니다.`,
    })
  }

  const addToCart = (item: { id: number; name: string; price: number }) => {
    // Add item to cart
    setCartCount(cartCount + 1)
    setAddedItem({ name: item.name, price: item.price })
    setShowCartAnimation(true)

    // Hide animation after 2 seconds
    setTimeout(() => {
      setShowCartAnimation(false)
      setAddedItem(null)
    }, 2000)

    toast({
      title: "장바구니에 추가됨",
      description: `${item.name}이(가) 장바구니에 추가되었습니다.`,
    })
  }

  // Function to render taste factor bars
  const renderTasteFactorBars = (tasteFactors: Record<string, number>) => {
    const factors = [
      { key: "spicy", label: "매운맛", color: "bg-red-500" },
      { key: "sweet", label: "단맛", color: "bg-pink-500" },
      { key: "salty", label: "짠맛", color: "bg-blue-500" },
      { key: "sour", label: "신맛", color: "bg-yellow-500" },
      { key: "bitter", label: "쓴맛", color: "bg-green-500" },
      { key: "umami", label: "감칠맛", color: "bg-purple-500" },
    ]

    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {factors.map((factor) => (
          <div key={factor.key} className="flex items-center text-xs">
            <span className="w-12 text-gray-600">{factor.label}</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full ${factor.color}`} style={{ width: `${tasteFactors[factor.key]}%` }}></div>
            </div>
            <span className="ml-1 text-gray-600">{tasteFactors[factor.key]}%</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="relative h-48 bg-gray-100">
        <Image src="/placeholder.svg?height=200&width=400" alt={restaurant.name} fill className="object-cover" />
        <button className="absolute top-4 left-4 bg-white rounded-full p-2" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button className="absolute top-4 right-4 bg-white rounded-full p-2" onClick={toggleFavorite}>
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(restaurant.rating) ? "fill-yellow-400" : "fill-gray-200"}`}
                  />
                ))}
              </div>
              <span className="ml-1 text-gray-600">
                {restaurant.rating} ({restaurant.reviewCount})
              </span>
              <span className="ml-2 text-gray-600">{restaurant.distance}</span>
            </div>
          </div>

          {/* Match percentage indicator */}
          <div className="bg-purple-100 rounded-full px-3 py-1 flex items-center">
            <span className="text-sm font-medium text-purple-700">내 입맛과 {restaurant.matchPercentage}% 일치</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {restaurant.category.map((cat, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 border-b pb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">최소주문금액</p>
            <p className="font-medium">{restaurant.minOrder}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">배달시간</p>
            <p className="font-medium">{restaurant.deliveryTime}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">배달팁</p>
            <p className="font-medium">{restaurant.deliveryFee}</p>
          </div>
        </div>

        {/* Taste Match Details */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <h3 className="font-medium mb-2">내 입맛 일치도: {restaurant.matchPercentage}%</h3>
          {renderTasteFactorBars(restaurant.tasteFactors)}
        </div>

        {/* Tab Navigation */}
        <div className="border-b mt-4">
          <div className="flex">
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === "menu" ? "text-purple-600 border-b-2 border-purple-600 font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("menu")}
            >
              메뉴
            </button>
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === "info" ? "text-purple-600 border-b-2 border-purple-600 font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("info")}
            >
              정보
            </button>
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === "reviews" ? "text-purple-600 border-b-2 border-purple-600 font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              리뷰
            </button>
          </div>
        </div>

        {/* Menu Tab Content */}
        {activeTab === "menu" && (
          <div className="mt-4 space-y-4">
            {restaurant.menu.map((item) => (
              <div key={item.id} className="border rounded-lg p-3 mb-4">
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="font-medium">{item.price.toLocaleString()}원</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    <div className="flex items-center mt-2">
                      {item.popular && (
                        <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full mr-2">
                          인기
                        </span>
                      )}
                      <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                        내 입맛과 {item.matchPercentage}% 일치
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-center">
                    <div
                      className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden mb-2"
                      onClick={() => router.push(`/restaurant/${restaurantId}/menu/${item.id}`)}
                    >
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-purple-600 text-purple-600"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      담기
                    </Button>
                  </div>
                </div>

                {/* Taste Match Details for Menu Item */}
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-xs font-medium mb-2">맛 프로필: {item.matchPercentage}% 일치</h4>
                  {renderTasteFactorBars(item.tasteFactors)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Tab Content */}
        {activeTab === "info" && (
          <div className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">공지사항</h3>
                <p className="text-sm text-gray-600">{restaurant.info.notice}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">매장 정보</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-20">주소</span>
                    <span className="text-sm">{restaurant.info.address}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-20">영업시간</span>
                    <span className="text-sm">{restaurant.info.hours}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 w-20">전화번호</span>
                    <span className="text-sm">{restaurant.info.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab Content */}
        {activeTab === "reviews" && (
          <div className="mt-4">
            <div className="space-y-4">
              {restaurant.reviewItems &&
                restaurant.reviewItems.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400" : "fill-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mt-1">{review.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                  </div>
                ))}

              <Button
                className="w-full bg-purple-600"
                onClick={() => router.push(`/restaurant/${restaurantId}/reviews`)}
              >
                리뷰 더보기
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
            onClick={() => router.push(`/cart?restaurant=${restaurantId}`)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니 ({cartCount})
          </Button>
          <Button className="flex-1 bg-purple-600" onClick={() => router.push(`/cart?restaurant=${restaurantId}`)}>
            주문하기
          </Button>
        </div>
      </div>

      {/* Cart Animation */}
      {showCartAnimation && addedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-lg font-medium">장바구니에 추가되었습니다!</p>
            <p className="text-sm text-gray-500 mt-1">{addedItem.name}</p>
            <p className="text-sm font-medium mt-2">{addedItem.price.toLocaleString()}원</p>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}
