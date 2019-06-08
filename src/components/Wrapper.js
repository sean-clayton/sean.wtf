import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(280px, ${props => props.theme.maxWidth}) 1fr;
  padding: 0 1rem;
  margin-bottom: 2rem;
`;

export default Wrapper;
