import { Button, Checkbox,DatePicker,Divider,Form, Input, Select } from 'antd';
import Search from 'antd/es/transfer/search';
import { AudioOutlined,DeleteOutlined  } from '@ant-design/icons';
import React from 'react'
import styled from 'styled-components';

export const DivStyle = styled.div `
    position: relative;
    width: 100%;
    height: 115vh;
    background: #F6F6F6;  
`
export const AllDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    
  
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
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
display: flex;
align-items: center;
color: #111111;
    }
`



export const StyledDOB = styled(DatePicker)`
    display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px;
gap: 16px;
width: 339px;
height: 56px;
background: #FFFFFE;
border: 1px solid #CBCBCB;
border-radius: 8px;
`

export const StyleSelect = styled(Select)`
&.ant-select-single .ant-select-selector {
    width: 100%;
    height: 56px;
    padding: 0 11px;
    align-items: center;
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
color: #111111;

}
 &.ant-select.ant-select-in-form-item{
    width: 339px !important;
    height: 56px !important;
}

`
export const ThreeLine = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    width: 100%;
    .title_formS{
        width: 70px;
height: 24px;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #939393;
    }
`
export const LeftColumn = styled.div`
    flex-basis: 50%;
`
export const RightColumn = styled.div`
    flex-basis: 50%;
    & .select_gara{
width: 160px;
height: 24px;
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
display: flex;
align-items: center;
margin-top: 16px;
}
& .select_remove{
    display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0px;
gap: 222px;
width: 95%;
margin-top: 12px;
 & span{
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: #2F3A4C;
 }
}
`
export const FormSearch = styled.div`
width: 100%;
display: flex;
flex-direction: row;
height: 45vh;
background: #FFFFFE;
border: 1px solid #DDE4EE;
border-radius: 8px;
gap: 16px;
`

export const StyleInput = styled(Input)`
    display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px;
gap: 8px;
width: 495px;
height: 56px;
left: 16px;
top: 16px;
margin-bottom: 30px;
border: 1px solid #CBCBCB;
border-radius: 8px;
`
export const SCheckbox = styled.div`
    display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;
width: 309px;
height: 184px;
left: 16px;
top: 88px;
margin-left: 8px;
`

export const StyleCheckBox = styled(Checkbox)`
width: 275px;
height: 24px;
margin-inline-start: 8px;
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
display: flex;
align-items: center;
color: #111111;
`
export const MyDivider = styled(Divider)`
    height: 100%;
  display: inline-block;
  border-left: 1px solid #DDE4EE;
  
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
