import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

export type MainLayoutProps = {
  // types...
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Layout style={{
      minHeight: '100vh',
      width: '100%'
    }}>
      <Outlet />
    </Layout>
  )
}

export default MainLayout