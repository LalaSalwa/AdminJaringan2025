
"use client"
import { useState, useTransition } from "react"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Lesson } from "@/types/lesson"
import { createLesson, updateLesson, deleteLesson } from "@/actions/lessons"
import { LessonForm } from "@/components/forms/lesson-form"
import type { CreateLessonInput } from "@/lib/schemas"
import { toast } from "sonner"

interface LessonsClientProps {
  initialLessons: Lesson[]
}

export function LessonsClient({ initialLessons }: LessonsClientProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleCreateLesson = async (data: CreateLessonInput) => {
    startTransition(async () => {
      const result = await createLesson(data)

      if (result.success) {
        toast("Success", {
          description: "Lesson created successfully",
        })
        setIsCreateDialogOpen(false)
        setLessons((prev) => [...prev, result.lesson!])
      } else {
        toast("Error", {
          description: result.error,
        })
      }
    })
  }

  const handleEditLesson = async (data: CreateLessonInput) => {
    if (!editingLesson) return

    startTransition(async () => {
      const result = await updateLesson(editingLesson.id, data)

      if (result.success) {
        toast("Success", {
          description: "Lesson updated successfully",
        })
        setIsEditDialogOpen(false)
        setEditingLesson(null)
        setLessons((prev) => prev.map((lesson) => (lesson.id === editingLesson.id ? result.lesson! : lesson)))
      } else {
        toast("Error", {
          description: result.error,
        })
      }
    })
  }

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return

    startTransition(async () => {
      const result = await deleteLesson(lessonId)

      if (result.success) {
        toast("Success", {
          description: "Lesson deleted successfully",
        })
        setLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId))
      } else {
        toast("Error", {
          description: result.error,
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lessons</h2>
          <p className="text-muted-foreground">Manage your language learning lessons</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={isPending}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>Add a new lesson to your course</DialogDescription>
            </DialogHeader>
            <LessonForm onSubmit={handleCreateLesson} isLoading={isPending} submitText="Create Lesson" />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>A list of all lessons in your course</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Challenges</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell>{lesson.order}</TableCell>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>{lesson.challenges?.length || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/lessons/${lesson.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => {
                          setEditingLesson(lesson)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleDeleteLesson(lesson.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
            <DialogDescription>Update lesson information</DialogDescription>
          </DialogHeader>
          {editingLesson && (
            <LessonForm
              onSubmit={handleEditLesson}
              initialData={editingLesson}
              isLoading={isPending}
              submitText="Update Lesson"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
