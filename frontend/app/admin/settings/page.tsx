import { axiosPubllic } from '@/axios/axios-client'
import SettingForm from './components/setting-form'

async function getPreference() {
  const res = await axiosPubllic.get('/preference/get')

  return res.data[0]
}

export const metadata = {
  title: 'Settings',
  description: 'this is admin settings page',
}

export default async function Settings() {
  const _getPreference = getPreference()
  const preference = await _getPreference

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={preference} />
      </div>
    </div>
  )
}
