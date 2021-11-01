import type { NextPage } from 'next';
import Header from '@/components/shared/Header';

const CommonLayout: NextPage = ({children}) => {
  return (
      <div className="min-h-full" data-testid="layout">
        <Header />
        <div className="container mx-auto py-12">
            {children}
        </div>
    </div>
  )
}

export default CommonLayout