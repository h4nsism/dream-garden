"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Share2, TagIcon } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function RecordDetailPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [tags, setTags] = useState(["참여도높음", "성장기록", "집중력"])
  const [newTag, setNewTag] = useState("")

  const availableTags = ["협동", "감정표현", "건강", "도전행동", "개선", "기분좋음"]

  const relatedRecords = [
    { date: "2025.11.05", preview: "텃밭 활동에서 집중력을 보였습니다" },
    { date: "2025.11.03", preview: "새로운 작물에 관심을 보였습니다" },
  ]

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/record/1">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-foreground">기록 상세</h1>
                <p className="text-xs text-muted-foreground">김하늘 · 2025.11.09</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? "저장" : "수정"}
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Record Content */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">관찰 내용</label>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    화분 돌보기 활동에 적극적으로 참여했습니다. 물 주는 순서를 기억하고 스스로 실행했어요. 작은 새싹이
                    자라는 모습을 관찰하며 "우와" 하고 감탄했습니다. 다른 친구들과 함께 물뿌리개를 나눠 쓰는 모습도
                    보였습니다.
                  </p>
                </div>

                {/* Tags Section */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-3 block">태그 관리</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Badge key={tag} className="bg-primary text-primary-foreground gap-2 px-3 py-1.5">
                        {tag}
                        {isEditing && (
                          <button onClick={() => handleRemoveTag(tag)} className="hover:text-primary-foreground/70">
                            ✕
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="새 태그 추가..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => {
                            if (newTag.trim()) {
                              handleAddTag(newTag.trim())
                              setNewTag("")
                            }
                          }}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <TagIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground w-full mb-1">추천 태그:</span>
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleAddTag(tag)}
                            className="px-3 py-1 text-xs rounded-full bg-accent/30 hover:bg-accent/50 text-accent-foreground transition-colors"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Records */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-4 text-foreground">같은 태그의 기록</h3>
              <div className="space-y-3">
                {relatedRecords.map((record, idx) => (
                  <Link key={idx} href="#">
                    <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">{record.date}</p>
                      <p className="text-sm text-foreground">{record.preview}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              부모에게 공유
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
              <Trash2 className="h-4 w-4" />
              삭제
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
