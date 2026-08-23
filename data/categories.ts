export type EwasteCategory = {
  id: string;
  title: string;
  image: string;
  alt: string;
  items: string[];
};

export const ewasteCategories: EwasteCategory[] = [
  {
    id: "computers",
    title: "Computers & IT Equipment",
    image: "/categories/computer-it.png",
    alt: "Laptop ready for e-waste recycling",
    items: [
      "Desktop Computers",
      "Laptops",
      "Servers",
      "Workstations",
      "Thin Clients",
    ],
  },
  {
    id: "accessories",
    title: "Computer Accessories",
    image: "/categories/computer-acc.png",
    alt: "Computer keyboard for recycling",
    items: [
      "Monitors (LCD/LED/CRT)",
      "Keyboards",
      "Mouse",
      "CPU Cabinets",
      "SMPS",
      "Hard Drives (HDD/SSD)",
      "RAM",
      "Motherboards",
      "Processors",
      "Graphics Cards",
    ],
  },
  {
    id: "networking",
    title: "Networking Equipment",
    image: "/categories/networking.png",
    alt: "Network servers and cables for recycling",
    items: [
      "Routers",
      "Switches",
      "Modems",
      "Access Points",
      "Firewalls",
      "Network Cables",
    ],
  },
  {
    id: "office",
    title: "Office Electronics",
    image: "/categories/oficial.jpg",
    alt: "Office printer for e-waste recycling",
    items: [
      "Printers",
      "Scanners",
      "Photocopiers",
      "Fax Machines",
      "Projectors",
      "Shredders",
    ],
  },
  {
    id: "telecom",
    title: "Telecom Equipment",
    image: "/categories/telecom-devices.jpg",
    alt: "Old mobile phones for recycling",
    items: [
      "Mobile Phones",
      "Landline Phones",
      "IP Phones",
      "EPABX Systems",
      "Walkie-Talkies",
    ],
  },
  {
    id: "storage",
    title: "Storage Devices",
    image: "/categories/storage-devices.jpg",
    alt: "Used hard drives and storage devices for recycling",
    items: [
      "Hard Disks",
      "SSDs",
      "Pen Drives",
      "Memory Cards",
      "CDs/DVDs",
      "Backup Tapes",
    ],
  },
  {
    id: "av",
    title: "Audio & Video Equipment",
    image: "/categories/audio-video.jpg",
    alt: "Television ready for e-waste recycling",
    items: [
      "Televisions",
      "Speakers",
      "CCTV Cameras",
      "DVR/NVR",
      "Microphones",
      "Amplifiers",
    ],
  },
  {
    id: "electrical",
    title: "Electrical & Electronic Equipment",
    image: "/categories/electrical-electronics.jpg",
    alt: "Used batteries collected for recycling",
    items: [
      "UPS Systems",
      "Inverters",
      "Batteries",
      "Power Supplies",
      "Chargers",
      "Adapters",
    ],
  },
  {
    id: "household",
    title: "Household Electronics",
    image: "/categories/household-electronics.jpg",
    alt: "Refrigerator for household e-waste recycling",
    items: [
      "Refrigerators",
      "Air Conditioners",
      "Washing Machines",
      "Microwave Ovens",
      "Water Dispensers",
    ],
  },
  {
    id: "industrial",
    title: "Industrial Electronics",
    image: "/categories/industrial-electronics.jpg",
    alt: "Industrial circuit board for recycling",
    items: [
      "PLC Panels",
      "Control Panels",
      "Electronic Meters",
      "Industrial Circuit Boards",
    ],
  },
  {
    id: "lighting",
    title: "Lighting Waste",
    image: "/categories/light-waste.jpg",
    alt: "Used light bulb for lighting waste recycling",
    items: ["LED Lights", "Tube Lights", "CFL Bulbs", "Electronic Ballasts"],
  },
  {
    id: "misc",
    title: "Miscellaneous E-Waste",
    image: "/categories/kit.jpg",
    alt: "Printed circuit board and electronic scrap",
    items: [
      "Cables & Wires",
      "PCBs (Printed Circuit Boards)",
      "Electronic Components",
      "Mixed Electronic Scrap",
    ],
  },
];
