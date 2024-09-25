// src/components/Unauthorized.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Unauthorized = () => {
  return (
    <Container>
      <Content>
        <Title>401 Unauthorized</Title>
        <Description>You are not authorized to access this page.</Description>
      </Content>
    </Container>
  );
};

export default Unauthorized;
