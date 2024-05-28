import { Box, Button, Container, Flex, Heading, HStack, IconButton, Image, Link, Stack, Text, VStack } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

const Index = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <Box>
      {/* Navigation Bar */}
      <Flex as="nav" bg="blue.600" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="md">EventManager</Heading>
        <HStack spacing={8}>
          <Link href="/">Home</Link>
          <Link href="/create-event">Create Event</Link>
          <Link href="/contact">Contact</Link>
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Box bg="blue.500" color="white" py={20} textAlign="center">
        <Heading size="2xl" mb={4}>Manage Your Events Seamlessly</Heading>
        <Text fontSize="lg" mb={6}>Create, manage, and track your events with ease.</Text>
        <Button colorScheme="teal" size="lg">Get Started</Button>
      </Box>

      {/* Upcoming Events Section */}
      <Container maxW="container.lg" py={10}>
        <Heading size="xl" mb={6} textAlign="center">Upcoming Events</Heading>
        <Stack spacing={8}>
          {events.map((event, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{event.name}</Heading>
              <Text mt={4}>{event.date}</Text>
              <Text mt={4}>{event.location}</Text>
              <Text mt={4}>{event.description}</Text>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Footer */}
      <Box bg="blue.600" color="white" py={10}>
        <Container maxW="container.lg">
          <Flex justifyContent="space-between" alignItems="center">
            <Text>&copy; 2023 EventManager. All rights reserved.</Text>
            <HStack spacing={4}>
              <IconButton as="a" href="https://facebook.com" aria-label="Facebook" icon={<FaFacebook />} />
              <IconButton as="a" href="https://twitter.com" aria-label="Twitter" icon={<FaTwitter />} />
              <IconButton as="a" href="https://instagram.com" aria-label="Instagram" icon={<FaInstagram />} />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;