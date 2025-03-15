import * as React from "react";
import PropTypes from "prop-types";
import { Card } from "@/components/ui/card";

const AuthCard = ({ title, children }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <Card.Header>
        <Card.Title className="text-2xl font-bold text-center">
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

AuthCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthCard;
