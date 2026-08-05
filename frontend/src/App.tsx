import { BriefcaseIcon } from '@heroicons/react/24/outline'

import Card from './components/Card'
import Theme from './components/Theme'
import './App.css'

function App() {
  return (
    <>
      <Theme />
      <div className="max-w-screen-lg mx-auto my-8">
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="size-6" />
          <h1 className="text-2xl text-primary">JobTrack</h1>
        </div>
        <Card />
      </div>
    </>
  )
}

export default App
