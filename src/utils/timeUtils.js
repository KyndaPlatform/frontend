export const generateTimeSlots = (startHour = 9, endHour = 16) => {
  const slots = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    const time24 = `${hour.toString().padStart(2, "0")}:00`;
    const label = `${displayHour}:00 ${ampm}`;

    slots.push({
      time24,
      label,
    });
  }

  return slots;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);

  const date = new Date();
  date.setHours(hour, minute);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
