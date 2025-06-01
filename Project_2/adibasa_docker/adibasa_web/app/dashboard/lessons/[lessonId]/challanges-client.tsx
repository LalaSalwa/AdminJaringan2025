
"use client"
import { useState, useTransition } from "react"
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
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
import type { Challenge } from "@/types/lesson"
import type { CreateChallengeInput } from "@/lib/schemas"
import { createChallenge, deleteChallenge, updateChallenge } from "@/actions/challanges"
import { toast } from "sonner"
import { ChallengeForm } from "@/components/forms/challange-form"

interface ChallengesClientProps {
  lessonId: string
  lessonTitle: string
  initialChallenges: Challenge[]
}

export function ChallengesClient({ lessonId, lessonTitle, initialChallenges }: ChallengesClientProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleCreateChallenge = async (data: CreateChallengeInput) => {
    startTransition(async () => {
      const result = await createChallenge(lessonId, data)

      if (result.success) {
        toast("Success", {
          description: "Challenge created successfully",
        })
        setIsCreateDialogOpen(false)
        setChallenges((prev) => [...prev, result.challenge!])
      } else {
        toast("Error", {
          description: result.error,
        })
      }
    })
  }

  const handleEditChallenge = async (data: CreateChallengeInput) => {
    if (!editingChallenge) return

    startTransition(async () => {
      const result = await updateChallenge(lessonId, editingChallenge.order, data)

      if (result.success) {
        toast("Success", {
          description: "Challenge updated successfully",
        })
        setIsEditDialogOpen(false)
        setEditingChallenge(null)
        setChallenges((prev) =>
          prev.map((challenge) => (challenge.order === editingChallenge.order ? result.challenge! : challenge)),
        )
      } else {
        toast("Error", {
          description: result.error,
        })
      }
    })
  }

  const handleDeleteChallenge = async (challengeOrder: number) => {
    if (!confirm("Are you sure you want to delete this challenge?")) return

    startTransition(async () => {
      const result = await deleteChallenge(lessonId, challengeOrder)

      if (result.success) {
        toast("Success", {
          description: "Challenge deleted successfully",
        })
        setChallenges((prev) => prev.filter((challenge) => challenge.order !== challengeOrder))
      } else {
        toast("Error", {
          description: result.error,
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/lessons">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Challenges</h2>
          <p className="text-muted-foreground">Manage challenges for lesson: {lessonTitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{challenges.length} challenges in this lesson</div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={isPending}>
              <Plus className="mr-2 h-4 w-4" />
              Add Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Challenge</DialogTitle>
              <DialogDescription>Add a new challenge to this lesson</DialogDescription>
            </DialogHeader>
            <ChallengeForm onSubmit={handleCreateChallenge} isLoading={isPending} submitText="Create Challenge" />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Challenges</CardTitle>
          <CardDescription>Challenges for this lesson</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Instruction</TableHead>
                <TableHead>Options</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.order}>
                  <TableCell>{challenge.order}</TableCell>
                  <TableCell className="font-medium">{challenge.question}</TableCell>
                  <TableCell>{challenge.instruction}</TableCell>
                  <TableCell>{challenge.options?.length || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => {
                          setEditingChallenge(challenge)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleDeleteChallenge(challenge.order)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Challenge</DialogTitle>
            <DialogDescription>Update challenge information</DialogDescription>
          </DialogHeader>
          {editingChallenge && (
            <ChallengeForm
              onSubmit={handleEditChallenge}
              initialData={editingChallenge}
              isLoading={isPending}
              submitText="Update Challenge"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
