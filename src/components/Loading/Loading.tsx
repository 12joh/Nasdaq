import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../theme/colors";

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator color={colors.white}/>
    </Container>
  );
};

export default Loading;

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
