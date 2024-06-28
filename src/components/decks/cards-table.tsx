import { Column, Sort, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components'
import { Card } from '@/services/decks/decks/decks.types'
import { formatDate } from '@/utils/date'

const columns: Column[] = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    sortable: true,
    title: 'Answer',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'grade',
    sortable: true,
    title: 'Grade',
  },
]

type Props = {
  cards: Card[] | undefined
  onSort: (key: Sort) => void
  sort: Sort
}
export const CardsTable = ({ cards, onSort, sort }: Props) => {
  return (
    <Table>
      <TableHeader columns={columns} onSort={onSort} sort={sort} />
      <TableBody>
        {cards?.map(card => (
          <TableRow key={card.id}>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell>{formatDate(card.updated)}</TableCell>
            <TableCell>{card.grade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
