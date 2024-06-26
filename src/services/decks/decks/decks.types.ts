export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isBlocked?: boolean | null
  isDeleted: boolean | null
  isFavorite: boolean
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type DecksResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type DeckResponse = Deck

export type CardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type Card = {
  answer: string
  answerImg?: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: null | string
  shots: number
  updated: string
  userId: string
}

export type GetDecksArgs = {
  authorId?: null | string
  currentPage?: null | number
  favoritedBy?: null | string
  itemsPerPage?: null | number
  maxCardsCount?: null | number
  minCardsCount?: null | number
  name?: null | string
  orderBy?: null | string
}
export type Nullable<T> = T | null
export type CreateDeckArgs = {
  cover?: Nullable<File>
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = { id: Deck['id'] } & Partial<CreateDeckArgs>

export type Tab = 'all' | 'my'

export type CardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type GetRandomCardArgs = {
  id: string
  previousCardId?: string
}
export type UpdateGradeArgs = {
  cardId: string
  grade: number
  id: string
}

export type UpdatedCard = Omit<CardResponse, 'grade'>

export type FieldGetDecksArgs =
  | 'authorId'
  | 'currentPage'
  | 'currentTab'
  | 'itemsPerPage'
  | 'maxCardsCount'
  | 'minCardsCount'
  | 'name'
  | 'orderBy'
