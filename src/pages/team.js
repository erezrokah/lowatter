import React from "react"
import styled from "@emotion/styled"
import Img from "gatsby-image/withIEPolyfill"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import showdown from "showdown"

import colors from "../components/framework/colors"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Legionella from "../components/framework/legionella"
import screens from "../components/framework/screens"

import SmolDots from "../images/svg/dots/dots-smol-horizontal.inline.svg"
import LinkedIn from "../images/svg/linkedin.inline.svg"
import Blob6 from "../images/svg/blobs/blob6.inline.svg"
import Blob7 from "../images/svg/blobs/blob7.inline.svg"
import Blob8 from "../images/svg/blobs/blob8.inline.svg"

const Title = styled.h1`
  margin-top: 6.25rem;
  margin-bottom: 1.5rem;
  grid-column: 2 / span 4;
  @media ${screens.tablet} {
    grid-column: 2 / span 6;
  }
`

const Dots = styled(SmolDots)`
  grid-column: 1 / span 2;
  @media ${screens.tablet} {
    grid-column: 1 / span 8;
    width: 60%;
  }
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
  @media ${screens.tablet} {
    grid-column: 2 / span 6;
    height: 520px;
  }
  @media ${screens.laptop} {
    height: 600px;
  }
  @media ${screens.mobileM} {
    grid-column: 1 / span 8;
    margin: 2rem 0;
    height: unset;
    min-height: 600px;
    > svg {
      height: 600px;
    }
  }
`

const Card = styled.section`
  display: flex;
  position: relative;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  z-index: 20;
  height: 100%;
  @media ${screens.mobileM} {
    flex-direction: column;
    width: calc(100% - 32px);
  }
`

const CardInfo = styled.aside`
  background: ${colors.gradient};
  flex-basis: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  @media ${screens.mobileM} {
    border-top-right-radius: 50px;
    border-bottom-left-radius: 0;
  }
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
  @media ${screens.tablet} {
    padding: 1rem 1.5rem;
    h4 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 0.7rem;
      margin-bottom: 1rem;
    }
    svg {
      width: 25px;
    }
  }
`

const ProfilePic = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  .gatsby-image-wrapper {
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  img {
    border-top-left-radius: 50px;
  }
  @media ${screens.mobileM} {
    img {
      border-top-right-radius: 50px;
    }
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
  @media ${screens.tablet} {
    padding: 1.5rem;
    font-size: 0.875rem;
  }
  @media ${screens.mobileM} {
    border-top-right-radius: 0;
    border-bottom-left-radius: 50px;
    div {
      max-height: 300px;
    }
  }
`
const converter = new showdown.Converter()
const TeamPage = ({ data }) => {
  const blobs = [
    <Blob6 style={{ position: "absolute" }} />,
    <Blob7 style={{ position: "absolute" }} />,
    <Blob8 style={{ position: "absolute" }} />,
  ]
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({ id: "seo.teamTitle" })}
        description={intl.formatMessage({ id: "seo.teamDescription" })}
        lang={intl.locale}
      />
      <Title>{intl.formatMessage({ id: "team.title" })}</Title>
      <Dots />
      {data.team.frontmatter.teamcards
        .filter(person => person.lang === intl.locale)
        .map((person, index) => (
          <CardBase even={index % 2 === 0} key={person.name}>
            {blobs[index % 3]}
            <Card>
              <CardInfo>
                <ProfilePic>
                  <Img
                    fluid={person.image.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt={person.name}
                    title={person.name}
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
                <div
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(person.bio) }}
                />
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
              fluid(maxWidth: 700, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
