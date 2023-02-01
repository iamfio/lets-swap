import { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'
import axios from 'axios'

const CreateProfile = (): JSX.Element => {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  // TODO: Data Validation
  const onSubmitForm = async (values: FieldValues) => {
    // const regex = /([A-Za-z0-9 \-\_]+)/

    // creates username from required field to use as req param on user's page
    if (values.username.includes(' ')) {
      values.username = values.username
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase()
    }

    const config: AxiosRequestConfig = {
      url: '/api/profile/create',
      method: 'POST',
      data: values,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios(config)
    const profile = res.data

    if (res.status === 201) {
      return router.push(`/u/${profile.username}`)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="grid h-full py-4 pb-6 card bg-base-300 rounded-box place-items-center">
            <input
              type="text"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="Username (required!)"
              {...register('username', { required: true })}
            />

            <input
              type="tel"
              className="w-full max-w-xs m-1 input input-bordered"
              placeholder="Phone Number"
              {...register('phoneNr')}
            />
          </div>

          <div className="divider">Address</div>

          <div className="grid h-full py-4 pb-6 card bg-base-300 rounded-box place-items-center">
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

            <button className="mt-4 btn btn-outline btn-primary btn-wide">
              Create Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProfile
