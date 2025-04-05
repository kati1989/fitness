import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { PayCard } from "./payCard";
import visa from "@/assets/visa.svg";
import masterCard from "@/assets/master-card.svg";

export type CardType = "masterCard" | "visa" | "unknown";

interface PaymentProps {
  submitPayment: () => void;
}

function getCardType(cardNumber: string): CardType {
  const sanitized = cardNumber.replace(/\D/g, "");

  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(sanitized)) {
    return "visa";
  } else if (/^5[1-5][0-9]{14}$/.test(sanitized)) {
    return "masterCard";
  } else if (
    /^2(2[2-9][0-9]{2}|2[3-9][0-9]{3}|[3-6][0-9]{4}|7[01][0-9]{3}|720[0-9]{2})[0-9]{10}$/.test(
      sanitized
    )
  ) {
    return "masterCard";
  } else {
    return "unknown";
  }
}

export const Payment = ({ submitPayment }: PaymentProps) => {
  const [cardType, setCardType] = useState<CardType>("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [validity, setValidity] = useState("");
  const [cvv, setCvv] = useState("");

  const props = {
    masterCard: {
      background:
        "linear-gradient(1deg,rgb(107, 198, 255) 0%,rgb(0, 28, 130) 100%)",
      image: masterCard,
      cvvLength: 3,
      cardLength: 16,
    },
    visa: {
      background:
        "linear-gradient(120deg,rgb(0, 0, 0) 0%,rgb(112, 112, 112) 100%)",
      image: visa,
      cvvLength: 3,
      cardLength: 16,
    },
    unknown: {
      background:
        "linear-gradient(45deg,rgb(255, 183, 0) 0%,rgb(255, 0, 0) 100%)",
      image: "",
      cvvLength: 3,
      cardLength: 16,
    },
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, props[cardType].cardLength);
    setCardNumber(value);
    setCardType(getCardType(value));
  };

  const handleValidityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2), 10);
      if (month > 12) {
        month = 12;
      }
      const year = value.slice(2);
      value = `${month.toString().padStart(2, "0")}/${year}`;
    }

    setValidity(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, props[cardType].cvvLength);
    setCvv(value);
  };

  const isDisabled = () => {
    return (
      cardNumber.length !== props[cardType].cardLength ||
      validity.length !== 5 ||
      cvv.length !== props[cardType].cvvLength
    );
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    submitPayment();
    e.preventDefault();
  };
  return (
    <Stack gap={4} alignItems={"center"}>
      <PayCard
        bgColor={props[cardType].background}
        image={props[cardType].image}
      />
      <form style={{ width: 450 }} onSubmit={handleSubmit}>
        <Stack gap={4}>
          <TextField
            type="text"
            fullWidth
            label="Card number"
            required
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          <TextField
            type="text"
            fullWidth
            label="Validity (MM/YY)"
            required
            value={validity}
            onChange={handleValidityChange}
          />
          <TextField
            type="text"
            fullWidth
            label="CVV"
            required
            value={cvv}
            onChange={handleCvvChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              p: 1,
              fontSize: "1.1rem",
              background: !isDisabled()
                ? props[cardType].background
                : "default",
            }}
            disabled={isDisabled()}
          >
            Pay now
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
