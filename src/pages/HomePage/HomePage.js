import React from 'react';
// import css from './HomePage.module.scss'
import Layout from "../../hoc/Layout/Layout";
import CreateGameForm from "../../components/CreateGameForm/CreateGameForm";

const HomePage = (props) => {
  return (
    <Layout>
      <CreateGameForm />
    </Layout>
  );
};

export default HomePage;
