import React from 'react'
import { Button } from 'react-bootstrap'
const RemoveFormCartComponent = ({productId,orderCreated,quantity,price,removeFromCartHandler=false}) => {

  return (
    <Button
             disabled={orderCreated}
              type="button"
              variant="secondary"
              onClick={removeFromCartHandler ? () => removeFromCartHandler(productId,quantity,price):undefined}
            >
              delete
            </Button>
  )
}

export default RemoveFormCartComponent;