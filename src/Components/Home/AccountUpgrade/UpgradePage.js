import React from 'react'
import Navbar from '../../Navbar'
import UpgradeForm from './UpgradeForm'

function UpgradePage({userId}) {
  return (
    <div className='upgradePage'>
      <Navbar />
      <UpgradeForm userId={userId} />
    </div>
  )
}

export default UpgradePage
