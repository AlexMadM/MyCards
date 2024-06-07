import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks/decks.service'

export function DecksTable() {
  const result = useGetDecksQuery()
  const [create] = useCreateDeckMutation()

  console.log(result, create)

  return <div />
}
