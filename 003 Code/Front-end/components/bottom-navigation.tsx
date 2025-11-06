"use client"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"

import { Home, Search, Heart, ClipboardList, User } from "lucide-react"

type NavItemProps = {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center px-3 ${isActive ? "text-purple-600" : "text-gray-500"}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/home") return true
    if (path === "/search" && pathname === "/search") return true
    if (path === "/favorites" && pathname === "/favorites") return true
    if (path === "/order-history" && pathname === "/order-history") return true
    if (path === "/mypage" && pathname === "/mypage") return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-2">
      <NavItem
        icon={<Home className="h-5 w-5" />}
        label="홈"
        isActive={isActive("/home")}
        onClick={() => router.push("/home")}
      />
      <NavItem
        icon={<Search className="h-5 w-5" />}
        label="검색"
        isActive={isActive("/search")}
        onClick={() => router.push("/search")}
      />
      <NavItem
        icon={<Heart className="h-5 w-5" />}
        label="찜"
        isActive={isActive("/favorites")}
        onClick={() => router.push("/favorites")}
      />
      <NavItem
        icon={<ClipboardList className="h-5 w-5" />}
        label="주문내역"
        isActive={isActive("/order-history")}
        onClick={() => router.push("/order-history")}
      />
      <NavItem
        icon={<User className="h-5 w-5" />}
        label="마이"
        isActive={isActive("/mypage")}
        onClick={() => router.push("/mypage")}
      />
    </div>
  )
}
