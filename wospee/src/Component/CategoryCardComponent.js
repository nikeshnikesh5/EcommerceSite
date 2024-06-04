import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({category,idx}) => {
 

  return (
    // <Card style={{ width: "18rem", padding:"2rem" , marginLeft:"2rem" }}>
    //   <Card.Img variant="top" src={category.image ?? null} />
    //   <Card.Body>
    //     <Card.Title>{category.name}</Card.Title>
    //     <Card.Text >
    //       {category.description}
    //     </Card.Text>
    //    <LinkContainer to={`/product-list/category/${category.name}`}>

    //     <Button variant="primary" style={{padding:"2rem" }}>Go somewhere</Button>
    //     </LinkContainer>
    //   </Card.Body>
    // </Card>
    <Card style={{ width: "18rem", margin: "1rem", padding: "1rem" }}>
    <Card.Img
      variant="top"
      src={category.image ?? null}
      className="mb-3" // Adds bottom margin to separate the image from the title
      style={{ objectFit: "cover", height: "12rem" }} // Ensures the image fits well within the card
    />
    <Card.Body>
      <Card.Title className="mb-3">{category.name}</Card.Title>
      <Card.Text className="mb-3">
        {category.description}
      </Card.Text>
      <LinkContainer to={`/product-list/category/${category.name}`}>
        <Button variant="primary" className="w-100">
          View More
        </Button>
      </LinkContainer>
    </Card.Body>
  </Card>
  );
};

export default CategoryCardComponent
