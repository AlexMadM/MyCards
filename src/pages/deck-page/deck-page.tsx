//import { useState } from 'react'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { Button, TextField, Typography } from '@/components'
import { CardsTable } from '@/components/decks/cards-table'
import { BackButton } from '@/components/ui/backButton'
import { Pagination } from '@/components/ui/pagination'
import { useDeckSearchParams } from '@/pages/decks-page/use-deck-search-params'
import { FieldGetDecksArgs } from '@/services/decks/decks'
import { useGetDeckByIdQuery, useGetDeckCardsQuery } from '@/services/decks/decks/decks.service'

export const DeckPage = () => {
  const { searchQuestion, setsearchQuestion } = useDeckSearchParams()
  const { deckId } = useParams()
  const { setSort, sort } = useDeckSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams({})
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: cardsData } = useGetDeckCardsQuery({
    id: deckId || '',
    params: {
      orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
      question: searchQuestion || '',
    },
  })

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
  const handleSearchQuestionChange = (value: string) => {
    setsearchQuestion(value)
  }

  return (
    <div>
      <Typography variant={'large'}>{deckData?.name}</Typography>
      <BackButton text={'Back to Decks List'} />
      <Button as={Link} to={learnLink}>
        Learn
      </Button>
      <TextField
        onValueChange={handleSearchQuestionChange}
        placeholder={'Search cards'}
        type={'search'}
      />
      <CardsTable cards={cardsData?.items} onSort={setSort} sort={sort} />
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
