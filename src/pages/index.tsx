import { useEffect } from 'react'
import { Container } from 'reactstrap'
import Layout from 'components/unauthLayout'

export default function Home() {
  useEffect(() => {
    document.body.classList.toggle('index-page')
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.document.body.classList.toggle('index-page')
    }
  }, [])

  return (
    <Layout title="Home">
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />

          <Container>
            <div className="content-center brand">
              <h1 className="h1-seo">Stockify</h1>
              <h3 className="d-none d-sm-block">
                A platform to help you take stock of your products, track and
                manage invoices, Customers, Payments and many more.
              </h3>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  )
}
