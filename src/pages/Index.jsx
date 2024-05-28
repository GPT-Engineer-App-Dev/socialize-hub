import { Box, Button, Container, Flex, Heading, HStack, IconButton, Image, Link, Stack, Text, VStack, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const toast = useToast();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleBookTickets = (event) => {
    setSelectedEvent(event);
    setIsBooking(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const updatedEvents = events.map((event) => {
      if (event === selectedEvent) {
        const bookedTickets = event.bookedTickets || [];
        bookedTickets.push({ name, email, numTickets });
        return { ...event, bookedTickets };
      }
      return event;
    });
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    setIsBooking(false);
    toast({
      title: "Booking Confirmed",
      description: `You have successfully booked ${numTickets} tickets for ${selectedEvent.name}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

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
              <Button mt={4} colorScheme="teal" onClick={() => handleBookTickets(event)}>Book Tickets</Button>
              {event.bookedTickets && (
                <Box mt={4}>
                  <Heading size="md">Booked Tickets</Heading>
                  {event.bookedTickets.map((ticket, idx) => (
                    <Text key={idx}>{ticket.name} - {ticket.numTickets} tickets</Text>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Booking Form */}
      {isBooking && (
        <Container maxW="container.md" py={10}>
          <Heading size="xl" mb={6} textAlign="center">Book Tickets for {selectedEvent.name}</Heading>
          <Box as="form" onSubmit={handleBookingSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="numTickets" isRequired>
                <FormLabel>Number of Tickets</FormLabel>
                <Input type="number" value={numTickets} onChange={(e) => setNumTickets(e.target.value)} min={1} />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">Confirm Booking</Button>
            </VStack>
          </Box>
        </Container>
      )}

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