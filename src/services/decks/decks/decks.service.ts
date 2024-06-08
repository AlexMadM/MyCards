import {
  CreateDeckArgs,
  Deck,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/services/decks/decks/decks.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<void, Deck>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `/v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<Deck, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({ method: 'Get', params: args ?? undefined, url: `v2/decks` }),
      }),
      updateDeck: builder.mutation<void, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...rest }) => ({
          body: rest,
          method: 'PATCH',
          url: `/v1/decks/${id}`,
        }),
      }),
    }
  },
})
export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksService
