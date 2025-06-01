export const dynamic = 'force-dynamic'
import { getLessons } from "@/actions/lessons"
import { LessonsClient } from "./lessons-client"

export default async function LessonsPage() {
  const lessons = await getLessons()

  return <LessonsClient initialLessons={lessons} />
}
