// import components
import NavLayout from '@/components/compound/navigation-layout'
import PageLayout from '@/components/compound/page-layout'
import SectionLayout from '@/components/compound/section-layout'
import ProductsList from '@/components/specific/product-list'
import SelectProductOptionsComponent from '@/components/compound/select-filtered-list-options'

//  @GET on http://thisAppUrl/:3000

export default function Home() {
  
  return (
    // basic server <span> component with some styling
    <PageLayout>
      {/* TOP NAV BAR MENU */}
      <NavLayout />

      {/* SELECT OPTIONS MENU */}
        {/* In development */}
        <SelectProductOptionsComponent />
        {/* end of menu */}

      {/* DISPLAYING PRODUCTS */}
      {/* server component with transparent background, rounded edges and some padding*/}
      <SectionLayout>
        {/* displays the content of the Products list stored in global state with Zustand - @hooks/orders.ts */}
        <ProductsList />
        {/* end of display */}
      </SectionLayout>
    </PageLayout>
  )
}
