import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import styles from '../styles/index.module.css'
import anapred from '../images/anapred.png';
import { Container, Typography } from "@material-ui/core"
import Button from "../app/components/Button";
import { navigate } from "gatsby";
import {  APP_BASE_ROUTE, APP_DOCS } from "../app/routes/routes";

const IndexPage = () => (
  <Layout>
    <SEO title="ANAPRED" />
    <Container className={styles.wrapper}>
      <Typography variant="h1" id={styles.pageTitle}>Anapred</Typography>
       <img src={anapred} alt="anapred" width="100%" id={styles.anapredImage}></img>
      <Container className={styles.buttons}>
        <Button style={{
          marginRight: "10px",
        }} text="GO TO APP" onClick ={e=>  navigate(APP_BASE_ROUTE)}></Button>
        <Button text="SEE DOCS" onClick ={e=>  navigate(APP_DOCS)}></Button>
      </Container>

    </Container>

  </Layout>
)
export default IndexPage
