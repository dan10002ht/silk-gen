import PropTypes from "prop-types";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";

const ProductCard = ({
  product: { name, price, image, description },
  onAddToCart,
}) => {
  return (
    <Card>
      <div className="aspect-square relative">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => onAddToCart({ name, price, image, description })}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
