//import { useState } from 'react'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { Button, TextField, Typography } from '@/components'
import { CardsTable } from '@/components/decks/cards-table'
import { Pagination } from '@/components/ui/pagination'
import { FieldGetDecksArgs } from '@/services/decks/decks'
import { useGetDeckByIdQuery, useGetDeckCardsQuery } from '@/services/decks/decks/decks.service'

export const DeckPage = () => {
  const { deckId } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams({})
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: cardsData } = useGetDeckCardsQuery({ id: deckId || '' })

  const itemsPerPage = searchParams.get('itemsPerPage') ?? '10'
  const changeFiltersParam = (field: FieldGetDecksArgs, value: null | string) => {
    const search = Object.fromEntries(searchParams)

    if (field !== 'currentPage') {
      setSearchParams({ ...search, currentPage: [], [field]: value ?? [] })
    } else {
      setSearchParams({ ...search, [field]: value ?? [] })
    }
  }
  const learnLink = `/decks/${deckId}/learn`

  return (
    <div>
      <Typography variant={'large'}>{deckData?.name}</Typography>
      <Button as={Link} to={learnLink}>
        Learn
      </Button>
      <TextField placeholder={'Search cards'} type={'search'} />
      <CardsTable cards={cardsData?.items} />
      <Pagination
        count={cardsData?.pagination?.totalPages || 1}
        itemsPerPage={+itemsPerPage}
        onChange={setCurrentPage}
        onPerPageChange={value => changeFiltersParam('itemsPerPage', value + '')}
        page={currentPage ?? 1}
        perPageOptions={[5, 10, 15, 20]}
      />
    </div>
  )
}
