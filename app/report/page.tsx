"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Send, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ReportPage() {
  const monthData = {
    student: "김하늘",
    month: "2025년 11월",
    summary:
      "김하늘 학생은 이번 달 꿈뜰 활동에 꾸준히 참여하며 긍정적인 변화를 보였습니다. 특히 화분 돌보기와 텃밭 활동에서 집중력과 자발성이 향상되었으며, 또래 친구들과의 협동 능력도 발전했습니다.",
    tagStats: [
      { tag: "참여도높음", count: 8, color: "bg-green-100 text-green-800" },
      { tag: "성장기록", count: 6, color: "bg-blue-100 text-blue-800" },
      { tag: "집중력", count: 5, color: "bg-purple-100 text-purple-800" },
      { tag: "협동", count: 4, color: "bg-orange-100 text-orange-800" },
      { tag: "기분좋음", count: 3, color: "bg-yellow-100 text-yellow-800" },
    ],
    highlights: [
      {
        date: "11.09",
        content: "화분 돌보기 활동에 적극 참여, 물 주는 순서를 스스로 기억하고 실행",
        tags: ["참여도높음", "성장기록"],
      },
      {
        date: "11.08",
        content: "텃밭에서 수확한 상추를 함께 씻으며 즐거워함, 협동 활동 적극 참여",
        tags: ["협동", "기분좋음"],
      },
      {
        date: "11.05",
        content: "새로운 작물 관찰 활동에서 긴 시간 집중, 질문도 적극적으로 함",
        tags: ["집중력", "참여도높음"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-foreground">월별 리포트</h1>
                <p className="text-xs text-muted-foreground">{monthData.student}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                {monthData.month}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* AI Summary */}
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold mb-1 text-foreground">AI 요약</h2>
                  <p className="text-xs text-muted-foreground">이번 달 주요 변화와 성장</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{monthData.summary}</p>
            </CardContent>
          </Card>

          {/* Tag Statistics */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4 text-foreground">태그 통계</h2>
              <div className="space-y-3">
                {monthData.tagStats.map((stat) => (
                  <div key={stat.tag} className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="w-28 justify-start bg-accent/20 text-accent-foreground border-0"
                    >
                      {stat.tag}
                    </Badge>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(stat.count / 8) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground w-8 text-right">{stat.count}회</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4 text-foreground">주요 기록</h2>
              <div className="space-y-4">
                {monthData.highlights.map((highlight, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-start gap-3">
                      <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {highlight.date}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed mb-2 text-foreground">{highlight.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {highlight.tags.map((tag) => (
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Parent Share Options */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4 text-foreground">부모 공유 설정</h2>
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-primary" />
                  <span className="text-sm text-foreground">AI 요약 포함</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-primary" />
                  <span className="text-sm text-foreground">태그 통계 포함</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-primary" />
                  <span className="text-sm text-foreground">주요 기록 포함</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Download className="h-4 w-4" />
              PDF 다운로드
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Send className="h-4 w-4" />
              부모에게 전송
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
