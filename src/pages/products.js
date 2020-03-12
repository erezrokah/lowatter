import React from "react"
import styled from "@emotion/styled"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Legionella from "../components/framework/legionella"

import MedDots from "../images/svg/dots/dots-medium.inline.svg"

const Title = styled.h1`
  grid-column: 3 / span 4;
  text-align: center;
  margin-top: 10rem;
  margin-bottom: 2rem;
`

const Description = styled.p`
  grid-column: 3 / span 4;
  text-align: center;
  font-size: 1.25rem;
  padding-bottom: 5rem;
`

const Dots = styled(MedDots)`
  grid-column: 8;
  grid-row: 1 / span 2;
  justify-self: end;
  height: 100%;
  margin-top: 5rem;
`

const ProductPage = ({ data }) => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO title="Our Products" description="Services and products of LoWatter." />
      <Title>More Info Coming Soon!</Title>'
      <Description>
        With the innovative domestic hot water controller you can lower the energy use,
        cost and infection risk during production, storage and distribution of your
        domestic hot water. This is possible by lowering the domestic hot water production
        temperature, while keeping the Legionella pneumophila risk under control with the
        heat shock regime.
      </Description>
      <Dots />
      <Legionella bottom={200} left={250} width={136} height={43} rotate={-55} />
    </Layout>
  )
}
export default ProductPage
