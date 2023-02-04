import { useProfile } from '@/lib/data/fetcher/profile'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'

type EditProfileProps = {
  setEditProfile: Dispatch<SetStateAction<boolean>>
}
const EditProfile = ({ setEditProfile }: EditProfileProps): JSX.Element => {
  const router = useRouter()
  const { profile } = useProfile()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...profile,
      ...profile?.address,
    },
  })

  // TODO: Data Validation (React Hook Form Validation)
  const onSubmitForm = async (values: FieldValues) => {
    // const regex = /([A-Za-z0-9 \-\_]+)/
    const config: AxiosRequestConfig = {
      url: '/api/profile/update',
      method: 'POST',
      data: values,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios(config)

    if (res.status === 201) {
      return router.push(`/u/${profile?.username}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-8 mb-2 text-lg font-bold">Edit Profile</h3>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col w-full border-opacity-50  md:w-[300px]">
        <div className="divider">Phone Nr.</div>
          <div className="grid h-full py-4 pb-6 card rounded-box place-items-center">
            <input
              type="tel"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="Phone Number"
              {...register('phoneNr', { required: true })}
            />
          </div>

          <div className="divider">Address</div>

          <div className="grid h-full py-4 pb-6 card rounded-box place-items-center">
            <input
              type="text"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="Street"
              {...register('street', { required: true })}
            />

            <input
              type="text"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="House Number"
              {...register('houseNr', { required: true })}
            />

            <input
              type="text"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="City"
              {...register('city', { required: true })}
            />

            <input
              type="text"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="ZIP Code"
              {...register('zip', { required: true })}
            />

            <input
              type="text"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="Country"
              {...register('country', { required: true })}
            />

            <button
              className="mt-4 btn btn-outline btn-primary"
              onClick={() => setEditProfile(false)}
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
