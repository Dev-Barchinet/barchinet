import React from 'react'
import { AvatarEdit } from './components/AvatarEdit'
import { ProfileForm } from './components/ProfileForm'

export const Profile = () => {
  return (
    <div className='flex flex-col items-start gap-4'>
      <div>
        <AvatarEdit />
      </div>
      <div>
        <ProfileForm />
      </div>
    </div>
  )
}
