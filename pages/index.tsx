import React, { cloneElement } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Center,
  Select,
  Flex,
  Heading,
  Input,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  Button,
  Spacer,
  Alert,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ONTARIO_MIN_ASKING_PRICE = 368000;
const ONTARIO_FIRST_BRACKET = 275;
const ONTARIO_SECOND_BRACKET = 1950;
const ONTARIO_THIRD_BRACKET = 2250;
const ONTARIO_FOURTH_BRACKET = 32000;
const ONTARIO_MAX_REFUND = 8475;
const ONTARIO_FIRST_RANGE = 55000;
const ONTARIO_SECOND_RANGE = 250000;
const ONTARIO_THIRD_RANGE = 400000;
const ONTARIO_FOURTH_RANGE = 2000000;

const BC_MIN_ASKING_PRICE = 500000;
const BC_MAX_ASKING_PRICE = 525000;
const BC_FIRST_BRACKET = 2000;
const BC_SECOND_BRACKET = 36000;
const BC_THIRD_BRACKET = 30000;
const BC_FIRST_RANGE = 200000;
const BC_SECOND_RANGE = 2000000;
const BC_THIRD_RANGE = 3000000;

const PROVINCES = {
  BC: "bc",
  ON: "ontario",
};

const ONTARIO_CONFIG = {
  FIRST_RANGE: ONTARIO_FIRST_RANGE,
  SECOND_RANGE: ONTARIO_SECOND_RANGE,
  FIRST_RANGE_MULTIPLE: 2 * 0.005,
  FIRST_BRACKET: ONTARIO_FIRST_BRACKET,
  MIN_ASKING_PRICE: 368000,
  SECOND_BRACKET: 1950,
  THIRD_BRACKET: 2250,
  FOURTH_BRACKET: 32000,
  MAX_REFUND: 8475,
  THIRD_RANGE: 400000,
  FOURTH_RANGE: 2000000,
};

const CONFIG = {
  [PROVINCES.ON]: ONTARIO_CONFIG,
};

const notFirstTimeHome = (province, price) => {
  const config = CONFIG[province];

  if (price < config.FIRST_RANGE) {
    return price * config.FIRST_RANGE_MULTIPLE;
  }

  if (config.FIRST_RANGE < price && price <= config.SECOND_RANGE) {
    return 2 * ((price - config.FIRST_RANGE) * 0.01 + config.FIRST_BRACKET);
  }
};

function ontarioCalcFirstTimeHome(price) {
  if (price < ONTARIO_MIN_ASKING_PRICE) {
    return 0;
  }

  if (ONTARIO_MIN_ASKING_PRICE < price && price < ONTARIO_THIRD_RANGE) {
    return (
      2 *
        ((price - ONTARIO_SECOND_RANGE) * 0.015 +
          ONTARIO_SECOND_BRACKET +
          ONTARIO_FIRST_BRACKET) -
      price * 0.0217
    );
  }
  if (price < ONTARIO_FOURTH_RANGE && ONTARIO_THIRD_RANGE < price) {
    return (
      2 *
        ((price - ONTARIO_THIRD_RANGE) * 0.02 +
          ONTARIO_THIRD_BRACKET +
          ONTARIO_SECOND_BRACKET +
          ONTARIO_FIRST_BRACKET) -
      ONTARIO_MAX_REFUND
    );
  }
  if (price > ONTARIO_FOURTH_RANGE) {
    return (
      2 *
        ((price - ONTARIO_FOURTH_RANGE) * 0.025 +
          ONTARIO_FOURTH_BRACKET +
          ONTARIO_THIRD_BRACKET +
          ONTARIO_SECOND_BRACKET +
          ONTARIO_FIRST_BRACKET) -
      ONTARIO_MAX_REFUND
    );
  }
}

function ontarioNotFirstTimeHome(price) {
  if (price < ONTARIO_FIRST_RANGE) {
    return 2 * price * 0.005;
  }
  if (ONTARIO_FIRST_RANGE < price && price < ONTARIO_SECOND_RANGE) {
    return 2 * ((price - ONTARIO_FIRST_RANGE) * 0.01 + ONTARIO_FIRST_BRACKET);
  }
  if (ONTARIO_SECOND_RANGE < price && price < ONTARIO_THIRD_RANGE) {
    return (
      2 *
      ((price - ONTARIO_SECOND_RANGE) * 0.015 +
        ONTARIO_SECOND_BRACKET +
        ONTARIO_FIRST_BRACKET)
    );
  }
  if (price < ONTARIO_FOURTH_RANGE && ONTARIO_THIRD_RANGE < price) {
    return (
      2 *
      ((price - ONTARIO_THIRD_RANGE) * 0.02 +
        ONTARIO_THIRD_BRACKET +
        ONTARIO_SECOND_BRACKET +
        ONTARIO_FIRST_BRACKET)
    );
  }
  if (price > ONTARIO_FOURTH_RANGE) {
    return (
      2 *
      ((price - ONTARIO_FOURTH_RANGE) * 0.025 +
        ONTARIO_FOURTH_BRACKET +
        ONTARIO_THIRD_BRACKET +
        ONTARIO_SECOND_BRACKET +
        ONTARIO_FIRST_BRACKET)
    );
  }
}
function bCFirstTimeHome(price) {
  if (price < BC_MIN_ASKING_PRICE) {
    return 0;
  }
  if (BC_MIN_ASKING_PRICE < price && price < BC_MAX_ASKING_PRICE) {
    return (price - BC_MIN_ASKING_PRICE) * 0.324;
  }
  if (BC_MAX_ASKING_PRICE < price && price < BC_SECOND_RANGE) {
    return (price - 200000) * 0.02 + BC_FIRST_BRACKET;
  }
  if (price > BC_SECOND_RANGE && BC_THIRD_RANGE > price) {
    return (
      (price - BC_SECOND_RANGE) * 0.03 + BC_FIRST_BRACKET + BC_SECOND_BRACKET
    );
  }
  if (price > BC_THIRD_RANGE) {
    return (
      (price - BC_THIRD_RANGE) * 0.03 +
      BC_FIRST_BRACKET +
      BC_SECOND_BRACKET +
      BC_THIRD_BRACKET
    );
  }
}

function bCNotFirstTimeHome(price) {
  if (price < BC_FIRST_RANGE) {
    return price * 0.01;
  }

  if (BC_FIRST_RANGE < price && price < BC_SECOND_RANGE) {
    return (price - BC_FIRST_RANGE) * 0.02 + BC_FIRST_BRACKET;
  }

  if (price > BC_SECOND_RANGE && BC_THIRD_RANGE > price) {
    return (
      (price - BC_SECOND_RANGE) * 0.03 + BC_FIRST_BRACKET + BC_SECOND_BRACKET
    );
  }

  if (price > BC_THIRD_RANGE) {
    return (
      (price - BC_THIRD_RANGE) * 0.03 +
      BC_SECOND_BRACKET +
      BC_FIRST_BRACKET +
      BC_THIRD_BRACKET
    );
  }
}

const calculate = (province, askingPrice, isFirstTimeHomeBuyer) => {
  if (province == PROVINCES.ON) {
    if (isFirstTimeHomeBuyer) {
      return ontarioCalcFirstTimeHome(askingPrice);
    }

    return ontarioNotFirstTimeHome(askingPrice);
  }

  if (province == PROVINCES.BC) {
    if (isFirstTimeHomeBuyer) {
      return bCFirstTimeHome(askingPrice);
    }

    return bCNotFirstTimeHome(askingPrice);
  }

  return 0;
};

const IndexPage = () => {
  const [province, setProvince] = React.useState(null);
  const [isFirstTimeHomeBuyer, setIsFirstTimeHomeBuyer] = React.useState(false);
  const [askingPrice, setAskingPrice] = React.useState(0);

  return (
    <>
      <Center h="100vh" flexDirection="column">
        <Box bg="#C8C8C8" h="auto" w="auto" rounded={5} p="3%">
          <Heading textAlign="center">Land Transfer Tax Calculator</Heading>
          <Center flexDirection="row" justifyContent="space-between">
            <Box mb={4}>
              <Checkbox
                id="homebuyer"
                width={250}
                size="md"
                pt={10}
                checked={isFirstTimeHomeBuyer}
                onChange={(e) =>
                  setIsFirstTimeHomeBuyer(e.target.checked as boolean)
                }
              >
                I am a first time home-buyer
              </Checkbox>
            </Box>
            <Spacer />
            <Box w="40%">
              <FormControl isRequired>
                <FormLabel fontSize="15px" ml={2}>
                  Province:
                </FormLabel>
                <Select
                  id="dropdown"
                  placeholder="Select region"
                  w={200}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="ontario">Ontario</option>
                  <option value={PROVINCES.BC}>British Columbia</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormLabel ml={5}>Asking price</FormLabel>
              <NumberInput
                min={0}
                onChange={(valueString, valueNumber) =>
                  setAskingPrice(Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField placeholder="$0" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {/* <Input
                id="asking"
                placeholder="Eg. $750 000"
                onChange={calcTax}
              ></Input> */}
            </Box>
          </Center>
        </Box>
        <Alert id="alert" status="success" mt={5} width="auto">
          <Center fontSize="20px">
            Your total land transfer tax amount is $
            {Math.ceil(calculate(province, askingPrice, isFirstTimeHomeBuyer))}
          </Center>
        </Alert>
      </Center>{" "}
      {/* <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table> */}
    </>
  );
};

export default IndexPage;
