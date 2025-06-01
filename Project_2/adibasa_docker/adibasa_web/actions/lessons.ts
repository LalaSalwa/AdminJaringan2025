"use server"

import { revalidatePath } from "next/cache"
import type { Lesson } from "@/types/lesson"
import { createLessonSchema, updateLessonSchema, type CreateLessonInput, type UpdateLessonInput } from "@/lib/schemas"
import { z } from "zod"
import connectDB from "@/lib/mongodb"
import LessonModel from "@/models/Lesson"
import type { ILesson } from "@/models/Lesson"

export async function getLessons(): Promise<Lesson[]> {
  try {
    await connectDB()

    const lessons = await LessonModel.find({}).sort({ order: 1 }).lean<ILesson[]>()

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      challenges: lesson.challenges || [],
    }))
  } catch (error) {
    console.error("Failed to fetch lessons:", error)
    throw new Error("Failed to fetch lessons")
  }
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  try {
    await connectDB()

    const lesson = await LessonModel.findOne({ id: lessonId }).lean<ILesson>()

    if (!lesson) return null

    return {
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      challenges: lesson.challenges || [],
    }
  } catch (error) {
    console.error("Failed to fetch lesson:", error)
    throw new Error("Failed to fetch lesson")
  }
}

export async function createLesson(data: CreateLessonInput) {
  try {
    // Validate input
    const validatedData = createLessonSchema.parse(data)

    await connectDB()

    const newLessonId = `lesson_${Date.now()}`

    const newLesson = new LessonModel({
      id: newLessonId,
      title: validatedData.title,
      order: validatedData.order,
      challenges: [],
    })

    await newLesson.save()

    revalidatePath("/dashboard/lessons")
    return {
      success: true,
      lesson: {
        id: newLesson.id,
        title: newLesson.title,
        order: newLesson.order,
        challenges: [],
      },
    }
  } catch (error) {
    console.error("Failed to create lesson:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to create lesson" }
  }
}

export async function updateLesson(lessonId: string, data: UpdateLessonInput) {
  try {
    // Validate input
    const validatedData = updateLessonSchema.parse(data)

    await connectDB()

    const updatedLesson = await LessonModel.findOneAndUpdate({ id: lessonId }, validatedData, {
      new: true,
    }).lean<ILesson>()

    if (!updatedLesson) {
      return { success: false, error: "Lesson not found" }
    }

    revalidatePath("/dashboard/lessons")
    return {
      success: true,
      lesson: {
        id: updatedLesson.id,
        title: updatedLesson.title,
        order: updatedLesson.order,
        challenges: updatedLesson.challenges || [],
      },
    }
  } catch (error) {
    console.error("Failed to update lesson:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to update lesson" }
  }
}

export async function deleteLesson(lessonId: string) {
  try {
    await connectDB()

    const deletedLesson = await LessonModel.findOneAndDelete({ id: lessonId })

    if (!deletedLesson) {
      return { success: false, error: "Lesson not found" }
    }

    revalidatePath("/dashboard/lessons")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete lesson:", error)
    return { success: false, error: "Failed to delete lesson" }
  }
}
