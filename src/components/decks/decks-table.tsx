import { useCreateDeckMutation, useGetDecksQuery } from '@/services/flashcards-api'

export function DecksTable() {
  const result = useGetDecksQuery()
  const [create] = useCreateDeckMutation()

  console.log(result)

  return <div />
}
