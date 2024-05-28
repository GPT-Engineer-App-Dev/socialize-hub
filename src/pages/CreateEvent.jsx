import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Textarea, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
    };
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));
    navigate("/");
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading size="xl" mb={6} textAlign="center">Create New Event</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="event-name" isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </FormControl>
          <FormControl id="event-date" isRequired>
            <FormLabel>Event Date</FormLabel>
            <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </FormControl>
          <FormControl id="event-location" isRequired>
            <FormLabel>Event Location</FormLabel>
            <Input value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
          </FormControl>
          <FormControl id="event-description" isRequired>
            <FormLabel>Event Description</FormLabel>
            <Textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" width="full">Create Event</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateEvent;