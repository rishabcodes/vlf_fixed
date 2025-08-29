// Fixed tabs component - temporary placeholder until @radix-ui packages are installed
import * as React from "react"

export const Tabs: React.FC<{children?: React.ReactNode; defaultValue?: string; value?: string}> = ({children}) => {
  return <div className="tabs">{children}</div>
}

export const TabsList: React.FC<{children?: React.ReactNode; className?: string}> = ({children, className}) => {
  return <div className={`tabs-list ${className || ''}`}>{children}</div>
}

export const TabsTrigger: React.FC<{children?: React.ReactNode; value?: string; className?: string}> = ({children, className}) => {
  return <button className={`tabs-trigger ${className || ''}`}>{children}</button>
}

export const TabsContent: React.FC<{children?: React.ReactNode; value?: string; className?: string}> = ({children, className}) => {
  return <div className={`tabs-content ${className || ''}`}>{children}</div>
}
