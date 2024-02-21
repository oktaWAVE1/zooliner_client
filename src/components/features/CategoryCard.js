import React from 'react';
import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const CategoryCard = ({category}) => {

    return (
        <Card className="CategoryCard">
            <Container>

                    <div className="content">
                        <Link to={`/category/${category.id}`}>
                            <div className="categoryImg">
                                <img alt="category_img" loading="lazy" src={category.category_images[0]?.img ? `${process.env.REACT_APP_API_URL}/images/categories/mini/${category.category_images[0]?.img}` : `${process.env.REACT_APP_API_URL}/images/products/mini/no_image.webp`}/>
                            </div>
                        </Link>
                        <Link to={`/category/${category.id}`}>
                            <div className="mt-2">{category.name}</div>
                        </Link>
                    </div>
            </Container>

        </Card>
    );
};

export default CategoryCard;