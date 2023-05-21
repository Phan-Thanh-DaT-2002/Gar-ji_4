import { Button, Form, Input,  } from 'antd';

import styled from 'styled-components';

export const DivStyle = styled.div `
    position: relative;
    width: 100%;
    height: 155vh;
    background: #F6F6F6;  
`
export const AllDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;
  
    position: absolute;
    
`

export const DivForm = styled(Form)`
    display: flex;
/* flex-direction: column; */
align-items: center;
padding: 16px;
gap: 34px;
width: 100%;
/* height: 862px; */
background: #FFFFFF;
border-radius: 16px;    
& .Btns{
    display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
width: 1071px;
height: 72px;
gap: 24px;
    & .btn-button{
        display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 21px;
width: 239px;
height: 48px;
    }
}
`

export const FirstInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
padding: 0px;
gap: 24px;

`

export const FirstLine = styled.div`
    display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 28px;
`

export const SecondLine = styled.div`
    display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 28px;
width: 1073px;
height: 88px;

`

export const FormItem = styled(Form.Item)`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;
width: 339px;
height: 88px;
    & input{ 
        display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px;
gap: 8px;
width: 339px;
height: 56px;
background: #FFFFFE;
border: 1px solid #CBCBCB;
border-radius: 8px;

    }
    &:where(.css-dev-only-do-not-override-15rg2km).ant-form-item .ant-form-item-control-input-content {
    flex: auto;
    max-width: 150% !important;
}
    
`

export const ButtonStyle = styled(Button)`
    display: flex;
flex-direction: row;
align-items: flex-start;
padding: 12px 16px;
gap: 8px;
width: 109px;
height: 48px;
border-radius: 8px;
& span{
    width: 77px;
height: 24px;

font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;

text-align: center;

}
`


export const StyleCommentBox = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 28vh;

width: 100%;
height: 30vh;



`
export const StyledTextArea = styled(Input.TextArea)`
  padding: 16px 16px 80px;
  gap: 8px;
  width: 1073px;
  height: 178px;
  background: #FFFFFE;
  border: 1px solid #CBCBCB;
  border-radius: 8px;
`;
