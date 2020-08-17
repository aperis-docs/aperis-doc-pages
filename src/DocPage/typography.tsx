import styled from 'styled-components'


export const PageTitle = styled.h2`
  font-weight: 300;
  font-size: 2em;
  text-align: center;

  @media screen and (min-width: 800px) {
    font-size: 3em;
    text-align: left;
  }
`

export const Lead = styled.div`
  font-size: 1.2rem;
  margin-bottom: .5rem;
  line-height: 1.4;

  > p:first-child {
    margin-top: 0;
  }
`
