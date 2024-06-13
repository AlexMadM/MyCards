import { baseApi } from '@/services/base-api'
import {
  CardResponse,
  CardsResponse,
  CreateDeckArgs, Deck,
  DeckResponse,
  DecksResponse,
  GetDecksArgs, GetRandomCardArgs,
  UpdateDeckArgs, UpdateGradeArgs,
} from '@/services/decks/decks/decks.types'
import { RootState } from '@/services/store'
import { getValuable } from '@/utils/get-valuable'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<DeckResponse, CreateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const res = await queryFulfilled

        for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
          getState(),
          [{ type: 'Decks' }]
        )) {
          if (endpointName !== 'getDecks') {
            continue
          }
          dispatch(
            decksService.util.updateQueryData(endpointName, originalArgs, draft => {
              draft.items.unshift(res.data)
            })
          )
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),updateGrade: builder.mutation<CardResponse, UpdateGradeArgs>({
      invalidatesTags: ['Cards'],
      query: ({ id, ...args }) => ({
        body: args,
        method: 'POST',
        url: `/v1/decks/${id}/learn`,
      }),
    }),
    deleteDeck: builder.mutation<void, { id: string }>({
      invalidatesTags: ['Decks'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/decks/${id}`,
      }),
    }),getDeck: builder.query<Deck, { id: string }>({
      providesTags: ['Deck'],
      query: ({ id }) => ({
        url: `/v1/decks/${id}`,
      }),
    }),
    getDeckById: builder.query<DeckResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}`,
    }),
    getDeckCards: builder.query<CardsResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}/cards`,
    }),
    getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
      providesTags: ['Decks'],
      query: args => {
        return {
          params: args ? getValuable(args) : undefined,
          url: `v1/decks`,
        }
      },
    }),
    toggleFavorite: builder.mutation<void, { deckId: string; favorite: boolean }>({
      invalidatesTags: ['Decks'],
      query: ({ deckId, favorite }) => ({
        method: favorite ? 'POST' : 'DELETE',
        url: `v1/decks/${deckId}/favorite`,
      }),
    }),getRandomCard: builder.query<CardResponse, GetRandomCardArgs>({
      providesTags: ['RandomCard'],
      query: ({ id, previousCardId }) => ({
        params: { previousCardId },
        url: `/v1/decks/${id}/learn`,
      }),
    }),
    updateDeck: builder.mutation<DeckResponse, UpdateDeckArgs>({
      invalidatesTags: ['Decks','Deck'],
      async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        const minCardsCount = state.decks.minCards
        const search = state.decks.search
        const currentPage = state.decks.currentPage
        const maxCardsCount = state.decks.maxCards
        const authorId = state.decks.authorId

        const patchResult = dispatch(
          decksService.util.updateQueryData(
            'getDecks',
            {
              authorId,
              currentPage,
              maxCardsCount,
              minCardsCount,
              name: search,
            },
            draft => {
              const deck = draft.items.find(deck => deck.id === id)

              if (!deck) {
                return
              }
              Object.assign(deck, patch)
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: ({ id, ...body }) => ({
        body,
        method: 'PATCH',
        url: `v1/decks/${id}`,
      }),
    }),
  }),
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
  useGetDecksQuery,
  useToggleFavoriteMutation,
  useUpdateDeckMutation,useGetDeckQuery,useGetRandomCardQuery,useUpdateGradeMutation
} = decksService
