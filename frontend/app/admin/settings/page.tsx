import { getPreference } from '@/actions/preference-action'
import SettingForm from './components/setting-form'

export const metadata = {
  title: 'Settings',
  description: 'this is admin settings page',
}

export default async function Settings() {
  const preference = await getPreference()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={preference} />
      </div>
    </div>
  )
}
