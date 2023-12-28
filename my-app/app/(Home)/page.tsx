import NavLayout from '@/components/compound/navigation-layout'
import PageLayout from '@/components/compound/page-layout'
import SectionLayout from '@/components/compound/section-layout'
import ProductsList from '@/components/specific/product-list'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// import { pageStyles } from '@/lib/tailwindStyles'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  
  return (
    <PageLayout>
      <NavLayout />
      <SectionLayout>
        <ProductsList />
      </SectionLayout>
    </PageLayout>
  )
}
