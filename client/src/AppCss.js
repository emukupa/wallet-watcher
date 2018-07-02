import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Intro = styled.div`
  font-size: 0.9rem;
  color: #666;
  width: 500px;
`;

export const Chart = styled.iframe`
  width: 500px;
  height: 125px;
  background: #eee;
`;

export const Form = styled.form`
  margin: 1rem auto;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  label {
    margin-right: 1rem;
  }

  input {
    width: 200px;
    margin-bottom: 1rem;
    height: 30px;
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  padding: 0.2rem 1rem;
  font-size: 1.1rem;
  background-color: #ee6352;
  color: #fff;
  border-radius: 10px;
  width: 150px;

  :hover {
    background-color: #c62a17;
    cursor: pointer;
  }
`;