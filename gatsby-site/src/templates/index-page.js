import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import HomePageBlogRoll from '../components/HomePageBlogRoll'
import PPEmailSignup from '../components/PPEmailSignup'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
}) => (
  <div>
    <div
    // this was in the background image resolver
    //!!image.childImageSharp ? image.childImageSharp.fluid.src : image
    // Issue was these lines:
    // backgroundPosition: `top left`,
    // backgroundAttachment: `fixed`,
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url('/img/pizza-homepage-resize.png')`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(0, 0, 0) 0.5rem 0px 0px, rgb(0, 0, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(0, 0, 0)',
            color: 'white',
            textAlign: 'center',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  {/* <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div> */}
                  <div className="tile" 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                  }}>
                  </div>
                </div>
                <div> {/* sign up form is this div */}
                  <HomePageBlogRoll />
                  <PPEmailSignup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
      }
    }
  }
`
