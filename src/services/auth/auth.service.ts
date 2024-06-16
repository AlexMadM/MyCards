import { baseApi } from '@/services/base-api'

import {LoginArgs, SignUpBody, User, UserData} from './auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, LoginArgs>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout',
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => '/v1/auth/me',
    }),signUp: builder.mutation<UserData, SignUpBody>({
      query: params => {
        const origin = window.location.origin

        return {
          body: {
            ...params,
            html: `<b>Hello, ##name##!<br/>Please confirm your email by clicking on the link below:<br/><a href="${origin}/confirmEmail/##token##">Confirm email</a>. If it doesn't work, copy and paste the following link in your browser:<br/>${origin}/confirmEmail/##token##`,
            subject: 'Verify your email address',
          },
          method: 'POST',
          url: 'v1/auth/sign-up',
        }
      },
    }),
  }),
})

export const { useLoginMutation,useSignUpMutation, useLogoutMutation, useMeQuery } = authService
