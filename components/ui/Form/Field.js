import styled from "@emotion/styled";

const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input {
    flex: 1;
    padding: 1rem;
  }
  textarea {
    height: 200px;
    width: 100%;
  }
`;

export default Field;
