import React from 'react';
import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const CategoryCard = ({category}) => {

    return (
        <Card className="CategoryCard">
            <Container>
                <Link to={`/category/${category.id}`}><img loading="lazy" src={category.category_images[0]?.img ? `${process.env.REACT_APP_API_URL}/images/categories/mini/${category.category_images[0]?.img}` : `${process.env.REACT_APP_API_URL}/images/products/mini/no_image.webp`}/>
                    <div>{category.name}</div>
                </Link>
            </Container>

        </Card>
    );
};

export default CategoryCard;