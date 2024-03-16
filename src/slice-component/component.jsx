import React from "react";
import styled, { ThemeProvider } from "styled-components";
import './styles/com.css'
const ButtonComponent = ({
  children,
  bgColor,
  outline,
  radius,
  width,
  color,
  gap,
 
  className,
  Onclick,
  onMouseOver,
  onMouseDown,
  isAnimationActive,
  type
}) => {
  const Buttons = styled.button`
    background: ${bgColor || "#53B175"};
    outline: ${outline || "2px solid #3A40EF"};
    padding: 8px 12px;
    border-radius: ${radius || "5px"};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    user-select: none;
    width: ${width || "100px"};
    color: ${globalThis.color || color || "#fff"};
    gap: ${gap || "2px"};
    border: none;
    transition: 350ms ease-in;

    position: relative;
    overflow: hidden;

    
    
     
  `

  return (
    <Buttons
      className={className}
      onClick={Onclick}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      type={type}
    >
      {children}
    </Buttons>
  );
};

const FlexParentComponent = ({ children, gap, alignItem, className,flexWrap,Height,marginTop }) => {
  const Div = styled.div`
    width: 100%;
    min-height: ${Height || "100dvh"} ;
    display: flex;
    justify-content: center;
    align-items: ${alignItem || "center"};
    gap: ${gap || "10px"};
    flex-wrap: ${flexWrap || "nowrap"};
    margin-top: ${marginTop || "10vh"};
  `;

  return <Div className={className}>{children}</Div>;
};

const FlexChildrenComponent = ({
  children,
  className,
  Bgcolor,
  boxShadow,
  alignItem,
  flexDirection,
  onClick,
  onMouseEnter,
  width,
  onMouseLeave,
  height,
  justifyContent,
  hoverBoxShadow
}) => {
  const Div = styled.div`
    background: ${Bgcolor || "transparent"};
    box-shadow: ${boxShadow || "0px 10px 13px -10px rgba(0,0,0,0.2)"};
    display: flex;
    justify-content: ${justifyContent || "center"};
    align-items: ${alignItem || "center"};
    flex-direction: ${flexDirection || "column"};
    width: ${width || "350px"};
    height: ${height || "150px"};
    &:hover{
      box-shadow:${hoverBoxShadow || "0px 0px 29px 0px rgba(0,0,0,0.2)"}

    }
  `;

  return (
    <Div
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Div>
  );
};

 const Input = ({name,handelChange,handelBlur,inputClassName,spanClassName,value})=>{


  return(
    <label htmlFor="input" className="inputLabel">
    <input type="text" name="" className={inputClassName} onChange={handelChange} onBlur={(e)=>handelBlur(e)} value={value || ''}/>
    <span className={spanClassName}>{name}</span>
  </label>
  )
  
}

export { ButtonComponent, FlexParentComponent, FlexChildrenComponent,Input };
