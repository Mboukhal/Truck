import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const User = () => {


  const [userInput, setUserInput] = useState("")



  return (
    <div className='fixed inset-0 flex justify-center items-center bg-fg/20 backdrop-blur-md z-50'>
      <div className='bg-bg p-8 rounded-lg flex gap-4 sm:flex-row flex-col w-[90%] md:w-1/2'>
        <Input
          type="text"
          value={userInput}
          onChange={(e) => {
            const val = e.target.value
            const user = val.charAt(0).toUpperCase() + val.slice(1)

            setUserInput(user)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              localStorage.setItem('user', userInput);
              window.location.reload();
            }
          }
          }
          placeholder="Enter your name"
          className='p-2 border border-fg rounded-lg'
        />
        <Button
          onClick={() => {
            localStorage.setItem('user', userInput);
            window.location.reload();
          }}
        >Submit</Button>
      </div>
    </div>
  )
}

export default User