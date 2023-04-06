import React from "react"
import styled from "styled-components"
import { Button, Checkbox,Form, Input } from 'antd';
export const DivStyle = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background: #FFFFFF;  

`
export const FormStyle = styled(Form)`

display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 64px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  box-shadow: 0px 4px 55px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
`

export const HeadingLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    width: 224px;
    height: 64px;

    & .wel_login{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        line-height: 36px;
        
    }
    & .tit_login{
        font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    }
`

export const MainLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

`
export const InforLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    width: 424px;
    height: 208px;
`
export const FormItem = styled(Form.Item)`  
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;

    width: 424px;
    height: 96px;

    & input{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 16px;
        gap: 8px;

        width: 424px;
        height: 56px;

        background: #FFFFFF;

        border: 1px solid #CBCBCB;
        border-radius: 8px;
    }
`
export const Label = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #111111;

`
export const StyleBtn = styled(Button)`
    display: flex;

justify-content:center;
padding: 16px;
gap: 8px;

width: 424px;
height: 56px;


background: #805EDF;
border-radius: 8px;
& span {
    font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #FFFFFE
}
&:hover{
    opacity:0.8;
    background: #805EDF;
}
`
