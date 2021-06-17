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
} from "@chakra-ui/react";

const IndexPage = () => {
  const [tax, setTax] = React.useState(0);
  function calcTax() {
    const homeCheck = document.getElementById("homebuyer") as HTMLInputElement;
    const home = homeCheck.checked;
    const price = document.getElementById("asking") as HTMLInputElement;
    const askingPrice = price.value;
    const drop = document.getElementById("dropdown") as HTMLInputElement;
    const dropMenu = drop.value;

    console.dir(document.getElementById("asking"));
    console.log(dropMenu);
    console.log(typeof +askingPrice);

    if (dropMenu == "ontario") {
      if (home == false) {
        if (+askingPrice < 55000.01) {
          setTax(2 * +askingPrice * 0.005);
        }
        if (55000.01 < +askingPrice && +askingPrice < 250000.01) {
          setTax(2 * ((+askingPrice - 55000) * 0.01 + 275));
        }
        if (250000.01 < +askingPrice && +askingPrice < 400000.01) {
          setTax(2 * ((+askingPrice - 250000) * 0.015 + 1950 + 275));
        }
        if (+askingPrice < 2000000.01 && 400000.01 < +askingPrice) {
          setTax(2 * ((+askingPrice - 400000) * 0.02 + 2250 + 1950 + 275));
        }
        if (+askingPrice > 2000000.0) {
          setTax(
            2 * ((+askingPrice - 2000000) * 0.025 + 32000 + 2250 + 1950 + 275)
          );
        }
      } else {
        if (+askingPrice < 368000) {
          setTax(0);
        }

        if (368000 < +askingPrice && +askingPrice < 400000.01) {
          setTax(
            2 * ((+askingPrice - 250000) * 0.015 + 1950 + 275) -
              +askingPrice * 0.0217
          );
        }
        if (+askingPrice < 2000000.01 && 400000.01 < +askingPrice) {
          setTax(
            2 * ((+askingPrice - 400000) * 0.02 + 2250 + 1950 + 275) - 8475
          );
        }
        if (+askingPrice > 2000000.0) {
          setTax(
            2 * ((+askingPrice - 2000000) * 0.025 + 32000 + 2250 + 1950 + 275) -
              8475
          );
        }
      }
    }
    //---------------------BRITISH COLUMBIA---------------------------------//
    else if (dropMenu == "bc") {
      if (home == false) {
        if (+askingPrice < 200000) {
          setTax(+askingPrice * 0.01);
        }
        if (200000 < +askingPrice && +askingPrice < 2000000) {
          setTax((+askingPrice - 200000) * 0.02 + 2000);
        }
        if (+askingPrice > 2000000 && 3000000 > +askingPrice) {
          setTax((+askingPrice - 2000000) * 0.03 + 2000 + 36000);
        }
        if (+askingPrice > 3000000) {
          setTax((+askingPrice - 3000000) * 0.03 + 36000 + 2000 + 30000);
        }
      } else {
        if (+askingPrice < 500000) {
          setTax(0);
        }
        if (500000 < +askingPrice && +askingPrice < 525000) {
          setTax((+askingPrice - 500000) * 0.324);
        }
        if (525000 < +askingPrice && +askingPrice < 2000000) {
          setTax((+askingPrice - 200000) * 0.02 + 2000);
        }
        if (+askingPrice > 2000000 && 3000000 > +askingPrice) {
          setTax((+askingPrice - 2000000) * 0.03 + 2000 + 36000);
        }
        if (+askingPrice > 3000000) {
          setTax((+askingPrice - 3000000) * 0.03 + 36000 + 2000 + 30000);
        }
      }
    } else {
      setTax(0);
    }
  }
  return (
    <>
      <Center h="100vh" flexDirection="column">
        <Box bg="#C8C8C8" h="auto" w="auto" rounded={5} p="3%">
          <Heading>Land Transfer Tax Calculator</Heading>
          <Center flexDirection="row" justifyContent="space-between">
            <Box mb={4}>
              <Checkbox
                id="homebuyer"
                width={250}
                size="md"
                pt={10}
                checked={false}
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
                <Select id="dropdown" placeholder="Select region" w={200}>
                  <option value="ontario">Ontario</option>
                  <option value="bc">British Columbia</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormLabel ml={5}>Asking price</FormLabel>
              <NumberInput id="asking" onChange={calcTax}>
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
        <Alert id="alert" status="success" mt={5} width="auto" maxHeight="15%">
          <Center fontSize="20px">
            Your total land transfer tax amount is ${Math.ceil(tax)}
          </Center>
        </Alert>
      </Center>{" "}
    </>
  );
};

export default IndexPage;
