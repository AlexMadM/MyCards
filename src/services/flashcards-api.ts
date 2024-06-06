import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  GetDecksArgs,
} from '@/components/decks/decks.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
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
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({ method: 'Get', params: args ?? undefined, url: `v2/decks` }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks'],
})

export const { useCreateDeckMutation, useGetDecksQuery } = flashcardsApi
