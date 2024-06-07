import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksTable } from '@/components/decks/decks-table'
import { Layout, useAuthContext } from '@/components/layout'

const publicRoutes: RouteObject[] = [
  {
    children: [
      // {
      //   element: <SignInPage />,
      //   path: '/login',
      // },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksTable />,
    path: '/',
  },
  // {
  //   element: <DeckPage />,
  //   path: '/decks/:deckId',
  // },
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
