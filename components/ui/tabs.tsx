'use client'

import { useState } from 'react'

export const Tabs = ({ children, defaultValue }: { children: React.ReactNode, defaultValue: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
  }

  return (
    <div>
      {children({
        activeTab,
        handleTabChange
      })}
    </div>
  )
}

export const TabsList = ({ children, className }: { children: React.ReactNode, className: string }) => {
  return (
    <div className={`tabs-list ${className}`}>
      {children}
    </div>
  )
}

export const TabsTrigger = ({ value, children, onClick }: { value: string, children: React.ReactNode, onClick: () => void }) => {
  return (
    <button
      className={`tab-trigger`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, children, activeTab }: { value: string, children: React.ReactNode, activeTab: string }) => {
  return (
    <div className={activeTab === value ? 'tab-content active' : 'tab-content'}>
      {children}
    </div>
  )
}
