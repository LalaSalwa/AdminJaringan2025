"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import type { Challenge } from "@/types/lesson"
import type { IChallenge, ILesson } from "@/models/Lesson"
import {
  createChallengeSchema,
  updateChallengeSchema,
  type CreateChallengeInput,
  type UpdateChallengeInput,
} from "@/lib/schemas"
import connectDB from "@/lib/mongodb"
import LessonModel from "@/models/Lesson"

export async function getChallenges(lessonId: string): Promise<Challenge[]> {
  try {
    await connectDB()

    const lesson = await LessonModel.findOne({ id: lessonId }).lean<ILesson>()

    if (!lesson) return []

    return lesson.challenges?.sort((a, b) => a.order - b.order) || []
  } catch (error) {
    console.error("Failed to fetch challenges:", error)
    throw new Error("Failed to fetch challenges")
  }
}

export async function createChallenge(lessonId: string, data: CreateChallengeInput) {
  try {
    // Validate input
    const validatedData = createChallengeSchema.parse(data)

    await connectDB()

    const lesson = await LessonModel.findOne({ id: lessonId })

    if (!lesson) {
      return { success: false, error: "Lesson not found" }
    }

    // Add the new challenge to the lesson's challenges array
    lesson.challenges.push(validatedData)
    await lesson.save()

    revalidatePath(`/dashboard/lessons/${lessonId}/challenges`)
    return {
      success: true,
      challenge: validatedData,
    }
  } catch (error) {
    console.error("Failed to create challenge:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to create challenge" }
  }
}

export async function updateChallenge(lessonId: string, challengeOrder: number, data: UpdateChallengeInput) {
  try {
    // Validate input
    const validatedData = updateChallengeSchema.parse(data)

    await connectDB()

    const lesson = await LessonModel.findOne({ id: lessonId })

    if (!lesson) {
      return { success: false, error: "Lesson not found" }
    }

    // Find the challenge by order
    const challengeIndex = lesson.challenges.findIndex((c: IChallenge) => c.order === challengeOrder)

    if (challengeIndex === -1) {
      return { success: false, error: "Challenge not found" }
    }

    // Update the challenge
    lesson.challenges[challengeIndex] = {
      ...lesson.challenges[challengeIndex],
      ...validatedData,
    }

    await lesson.save()

    revalidatePath(`/dashboard/lessons/${lessonId}/challenges`)
    return {
      success: true,
      challenge: lesson.challenges[challengeIndex],
    }
  } catch (error) {
    console.error("Failed to update challenge:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to update challenge" }
  }
}

export async function deleteChallenge(lessonId: string, challengeOrder: number) {
  try {
    await connectDB()

    const lesson = await LessonModel.findOne({ id: lessonId })

    if (!lesson) {
      return { success: false, error: "Lesson not found" }
    }

    // Find the challenge by order
    const challengeIndex = lesson.challenges.findIndex((c: IChallenge) => c.order === challengeOrder)

    if (challengeIndex === -1) {
      return { success: false, error: "Challenge not found" }
    }

    // Remove the challenge from the array
    lesson.challenges.splice(challengeIndex, 1)
    await lesson.save()

    revalidatePath(`/dashboard/lessons/${lessonId}/challenges`)
    return { success: true }
  } catch (error) {
    console.error("Failed to delete challenge:", error)
    return { success: false, error: "Failed to delete challenge" }
  }
}
