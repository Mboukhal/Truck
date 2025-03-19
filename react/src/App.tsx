import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Route, Routes } from "react-router"
import './App.css'
import { useTheme } from './components/theme-provider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import NotFound from './pages/NotFound'
import Eld from './pages/eld'
import Home from './pages/home'
import User from './pages/user'


import { BrowserRouter } from "react-router"


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// const router = createBrowserRouter([
//   {
//     // path: "/",
//     // element: <Home />,
//     // errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "user",
//         element: <User />,
//         // loader: getUsersAllLoader,
//       }]
//   }
// ]);

function App() {
  const { setTheme, theme } = useTheme()

  const [userName, setUserName] = useState("")

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      if (window.location.pathname === "/user") {
        window.location.href = "/"
      }
      setUserName(user)
    }
    else {
      if (window.location.pathname !== "/user") {
        window.location.href = "/user"
      }
    }


  }, [userName])


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div>
            {
              userName !== "" &&
              <nav className='fixed inset-0 bg-bg/40 backdrop-blur-md h-14 shadow-md z-40'>
                <div className='container flex items-center justify-between h-full'>
                  <div className='text-xl font-bold flex items-center gap-2'>
                    <a href="/" className='flex items-center gap-2 !no-underline '>
                      <img src="/logo.png" alt="vite" className="size-9  rounded-md" />
                      <h4 className='!font-[600]'>
                        Spotter Truck
                      </h4>
                    </a>
                  </div>
                  <div className='flex gap-4'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className='size-10 cursor-pointer' >
                          <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-fit mr-4" sideOffset={5} >
                        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className='cursor-pointer'
                            onClick={() => {
                              setTheme(theme === 'dark' ? 'light' : 'dark')
                            }}
                          >
                            {
                              theme === 'dark' ? 'Ligth' : 'Dark'
                            } Mode
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </nav>
            }
            {/* <RouterProvider router={router} /> */}
            <div className='mt-14'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/user" element={<User />} />
                <Route path="/eld/:pid" element={<Eld />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
