import React from "react"
import styled from "@emotion/styled"
import Img from "gatsby-image/withIEPolyfill"
import { graphql } from "gatsby"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import colors from "../components/framework/colors"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Legionella from "../components/framework/legionella"

import SmolDots from "../images/svg/dots/dots-smol-horizontal.inline.svg"
import LinkedIn from "../images/svg/linkedin.inline.svg"
import Blob6 from "../images/svg/blobs/blob6.inline.svg"
import Blob7 from "../images/svg/blobs/blob7.inline.svg"
import Blob8 from "../images/svg/blobs/blob8.inline.svg"

const Title = styled.h1`
  margin-top: 6.25rem;
  margin-bottom: 1.5rem;
  grid-column: 2 / span 2;
`

const Dots = styled(SmolDots)`
  grid-column: 1 / span 2;
`

const CardBase = styled.div`
  margin: 5rem 0;
  grid-column: ${props => (props.even ? "2 / span 5" : "3 / span 5")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  &:last-of-type {
    margin-bottom: 10rem;
  }
  > svg {
    width: 103%;
    height: 107%;
  }
`

const Card = styled.section`
  display: flex;
  position: relative;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  z-index: 20;
  height: 100%;
`

const CardInfo = styled.aside`
  background: ${colors.gradient};
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
`

const CardInfoDetails = styled.div`
  padding: 1rem 2.25rem;
  h3 {
    color: ${colors.white};
    margin-bottom: 0;
  }
  h4 {
    color: ${colors.darkAccent};
    margin-bottom: 1.125rem;
  }
  p {
    color: ${colors.darkAccent};
    text-transform: capitalize;
    font-size: 0.875rem;
  }
  a {
    &:hover,
    &:focus {
      svg {
        fill: ${colors.white} !important;
      }
    }
    svg {
      transition: fill 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      fill: ${colors.darkAccent};
    }
  }
`

const ProfilePic = styled.div`
  position: relative;
  width: 100%;
  &:after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  img {
    border-top-left-radius: 50px;
  }
`

const CardBody = styled.article`
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  background: ${colors.white};
  flex-basis: 60%;
  padding: 2.25rem;
  text-align: justify;
  div {
    max-height: 100%;
    overflow-y: auto;
  }
`

const TeamPage = ({ data }) => {
  const blobs = [
    <Blob6 style={{ position: "absolute" }} />,
    <Blob7 style={{ position: "absolute" }} />,
    <Blob8 style={{ position: "absolute" }} />,
  ]
  const intl = useIntl()
  return (
    <Layout>
      <SEO title="Our Team" description="The people begind LoWatter" />
      <Title>Meet our team!</Title>
      <Dots />
      {data.team.frontmatter.teamcards
        .filter(person => person.lang === intl.locale)
        .map((person, index) => (
          <CardBase even={index % 2 === 0}>
            {blobs[index % 3]}
            <Card>
              <CardInfo>
                <ProfilePic>
                  <Img
                    fluid={person.image.childImageSharp.fixed}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt={person.name}
                    title={person.name}
                    style={{ position: "static" }}
                  />
                </ProfilePic>
                <CardInfoDetails>
                  <h3>{person.name}</h3>
                  <h4>{person.subtitle}</h4>
                  <p>{person.description}</p>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn />
                  </a>
                </CardInfoDetails>
              </CardInfo>
              <CardBody>
                <div dangerouslySetInnerHTML={{ __html: person.bio }} />
              </CardBody>
            </Card>
            {index % 5 === 0 && (
              <Legionella
                width={194}
                height={68}
                rotate={41}
                bottom={-100}
                right={-300}
              />
            )}
            {index % 5 === 1 && (
              <Legionella
                width={173}
                height={55}
                rotate={-47}
                bottom={-100}
                left={-400}
              />
            )}
            {index % 5 === 2 && (
              <Legionella width={123} height={34} rotate={12} bottom={0} right={-250} />
            )}
          </CardBase>
        ))}
    </Layout>
  )
}
export default TeamPage

export const query = graphql`
  query TeamQuery {
    team: markdownRemark(fileAbsolutePath: { regex: "/pages/team/" }) {
      frontmatter {
        teamcards {
          bio
          description
          lang
          linkedIn
          name
          number
          subtitle
          image {
            childImageSharp {
              fixed(width: 700, quality: 85) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }
`