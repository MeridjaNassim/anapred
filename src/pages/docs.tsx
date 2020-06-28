import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import styles from '../styles/index.module.css'
import anapred from '../images/anapred.png';
import { Container, Typography } from "@material-ui/core"
import Button from "../app/components/Button";
import { navigate } from "gatsby";
import {  APP_BASE_ROUTE } from "../app/routes/routes";

const IndexPage = () => (
  <Layout>
    <SEO title="DOCS" />
    <Container className={styles.wrapper}>
      <Typography variant="h1" id={styles.pageTitle}>DOCUMENTATION</Typography>
       <img src={anapred} alt="anapred" width="100%" id={styles.anapredImage}></img>
      <Container className={styles.buttons}>
        <Button text="GO TO APP" onClick ={e=>  navigate(APP_BASE_ROUTE)}></Button>
      </Container>

    </Container>

  </Layout>
)
export default IndexPage
