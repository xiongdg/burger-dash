import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import { easeBackOut } from "d3-ease";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 180px;
  display: flex;

  flex-direction: column;
  top: 72px;
  left: 16px;
`;

const ItemWrapper = styled(a.div)`
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  color: #000;
  position: relative;
  overflow: visible;
`;

const ItemContent = styled(a.div)`
  background-color: rgba(0, 0, 0, 0.01);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
`;

const Label = styled.div``;

const Image = styled.div`
  width: 30px;
  margin-right: 8px;
`;

const Count = styled.div`
  margin-left: auto;
`;

function Item(props) {
  const [animate, setAnimate] = useState(false);

  const contentProps = useSpring({
    config: {
      duration: 300,
      easing: easeBackOut
    },
    transform: animate ? "scale(1.3)" : "scale(1)"
  });

  useEffect(() => {
    let timeout = null;

    if (props.count > 0) setAnimate(true);

    if (animate) clearTimeout(timeout);

    timeout = setTimeout(() => {
      setAnimate(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [props.count]);

  return (
    <ItemWrapper {...props}>
      <ItemContent style={contentProps}>{props.children}</ItemContent>
    </ItemWrapper>
  );
}

export default { Container, Item, Count, Label, Image };