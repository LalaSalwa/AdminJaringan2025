import { getChallenges } from "@/actions/challanges"
import { getLesson } from "@/actions/lessons"
import { notFound } from "next/navigation"
import { ChallengesClient } from "./challanges-client"

interface ChallengesPageProps {
  params: Promise<{
    lessonId: string
  }>
}

export default async function ChallengesPage({ params }: ChallengesPageProps) {
  const { lessonId } = await params

  const [challenges, lesson] = await Promise.all([getChallenges(lessonId), getLesson(lessonId)])

  if (!lesson) {
    notFound()
  }

  return <ChallengesClient lessonId={lessonId} lessonTitle={lesson.title} initialChallenges={challenges} />
}
