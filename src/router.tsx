import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout, useAuthContext } from '@/components/layout'
import { DeckPage } from '@/pages/deck-page/deck-page'
import { DecksPage } from '@/pages/decks-page/decks-page'
import { SignInPage } from '@/pages/sign-in-page/sign-in-page'
import {LearnCardsPage} from "@/pages/learn-cards-page";

import {SignUpPage} from "@/pages/sign-up-page/sign-up";

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: '/login',
      }, {
        element: <SignUpPage />,
        path: '/sign-up',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
  {
    element: <DeckPage />,
    path: '/decks/:deckId',
  }, {
    element: <LearnCardsPage />,
    path: '/decks/:deckId/learn',
  },
]

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
