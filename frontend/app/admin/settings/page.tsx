import { Preference } from '@/types/interface/preference.interface'
import SettingForm from './components/setting-form'

const dummyData: Preference = {
  logo: 'random logo',
  facebookURL: 'this is facebook url',
  instagramURL: 'this is instagram url',
  email: 'this is email',
  phone: 'this is phone',
  storeName: 'this is store name',
}

export default function Settings() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={dummyData} />
      </div>
    </div>
  )
}
