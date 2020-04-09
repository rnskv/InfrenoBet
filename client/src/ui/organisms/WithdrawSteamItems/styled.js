import styled, { keyframes } from 'styled-components';
import Button from 'ui/atoms/Button';
import Title from 'ui/atoms/Title';
import Inventory from 'ui/organisms/Inventory';
import Popup from 'ui/molecules/Popup';

export const Container = styled.div`
  padding: 10px 25px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-grey-400);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const StyledButton = styled(Button)`
  margin: 25px;
  min-width: 150px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
`;

export const StyledTitle = styled(Title)`
  margin: 0;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: normal;
  background-color: var(--color-grey-600);
`;

export const Cart = styled.div`
  background-color: var(--color-blue);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px 0 var(--color-grey-550);
  margin-left: 10px;
`;

export const InventoryContainer = styled.div`
  background-color: var(--color-blue);
  margin-right: 10px;
  border-radius: 8px;
`;

export const ItemsViewport = styled.div`
  height: 215px;
  position: relative;
`;


export const StyledInventory = styled(Inventory)`
  height: 100%;
`;

export const StyledPopup = styled(Popup)`
  min-width: 900px;
`;

export const Wrapper = styled.div`
    @keyframes rotate {
     0% { transform: rotateZ(0); left: 0; }
     10% { transform: rotateZ(0); left: 5px}
     20% { transform: rotateZ(0); left: 0; }
     30% { transform: rotateZ(0); rotateX(0); }
     80% { transform: rotateZ(180deg); rotateX(0); }
     100% { transform: rotateZ(180deg) rotateX(180deg); }
    }
    
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px 0;
    position: relative;
    
    svg {
        width: 40px;
        height: 40px;
        fill: var(--color-yellow);
        padding: 15px;
        animation: rotate 2s;
        transform: rotateZ(180deg) rotateX(180deg);
        position: relative;
    }
`;
