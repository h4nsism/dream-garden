import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Calendar, User, FileText, Sprout } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const students = [
    {
      id: 1,
      name: "김하늘",
      lastRecord: "2025.11.09",
      tags: ["참여도높음", "성장기록"],
      avatar: "🌱",
    },
    {
      id: 2,
      name: "이준호",
      lastRecord: "2025.11.08",
      tags: ["집중력", "협동"],
      avatar: "🌿",
    },
    {
      id: 3,
      name: "박지수",
      lastRecord: "2025.11.07",
      tags: ["감정표현", "건강"],
      avatar: "🌾",
    },
    {
      id: 4,
      name: "최민서",
      lastRecord: "2025.11.06",
      tags: ["도전행동", "개선"],
      avatar: "🪴",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">꿈뜰 기록</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Actions */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="학생 이름 검색..." className="pl-10 bg-card" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="h-4 w-4" />
              학생 추가
            </Button>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Link key={student.id} href={`/record/${student.id}`}>
              <Card className="hover:shadow-md transition-all hover:border-primary/30 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{student.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">최근 기록: {student.lastRecord}</p>
                      <div className="flex flex-wrap gap-2">
                        {student.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-accent/20 text-accent-foreground border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                      <FileText className="h-3 w-3 mr-1" />
                      기록 보기
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                      <Plus className="h-3 w-3 mr-1" />새 기록
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Access Banner */}
        <Card className="mt-8 bg-accent/10 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1 text-foreground">월별 리포트</h3>
                <p className="text-sm text-muted-foreground">11월 기록을 요약하고 부모님께 공유하세요</p>
              </div>
              <Link href="/report">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  리포트 보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
