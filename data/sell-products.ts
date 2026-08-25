export type SellProduct = {
  id: string
  name: string
  image: string
  alt: string
  priceLabel: string
}

export const largeAppliances: SellProduct[] = [
  {
    id: "dishwasher",
    name: "Dishwasher",
    image: "/large-applince/Dishwasher.jpg",
    alt: "Sell dishwasher for recycling",
    priceLabel: "₹ 950",
  },
  {
    id: "window-ac",
    name: "Window AC",
    image: "/large-applince/windo-ac.png",
    alt: "Sell window AC for recycling",
    priceLabel: "₹ 5,500",
  },
  {
    id: "washing-machine",
    name: "Washing Machine",
    image: "/large-applince/washing_Machine.jpg",
    alt: "Sell washing machine for recycling",
    priceLabel: "₹ 1,200",
  },
  {
    id: "split-ac",
    name: "Split AC",
    image: "/large-applince/Split_AC.png",
    alt: "Sell split AC for recycling",
    priceLabel: "₹ 5,800",
  },
  {
    id: "fridge",
    name: "Fridge",
    image: "/large-applince/Fridge.jpg",
    alt: "Sell fridge for recycling",
    priceLabel: "₹ 2,000",
  },
]

export const smallAppliances: SellProduct[] = [
  {
    id: "mixer-grinder",
    name: "Mixer Grinder",
    image: "/small-appliance/Mixer_Grinder.png",
    alt: "Sell mixer grinder for recycling",
    priceLabel: "₹ 250",
  },
  {
    id: "geyser",
    name: "Geyser",
    image: "/small-appliance/Geyser.png",
    alt: "Sell geyser for recycling",
    priceLabel: "₹ 200",
  },
  {
    id: "heater",
    name: "Heater",
    image: "/small-appliance/Heater.jpg",
    alt: "Sell heater for recycling",
    priceLabel: "₹ 250",
  },
  {
    id: "chimney",
    name: "Chimney",
    image: "/small-appliance/Chimneys.jpg",
    alt: "Sell chimney for recycling",
    priceLabel: "₹ 380",
  },
  {
    id: "hob",
    name: "Hob",
    image: "/small-appliance/Hobb__Normal.jpg",
    alt: "Sell hob for recycling",
    priceLabel: "₹ 350",
  },
  {
    id: "table-fan",
    name: "Table Fan",
    image: "/small-appliance/Table_Fan.png",
    alt: "Sell table fan for recycling",
    priceLabel: "₹ 250",
  },
  {
    id: "vacuum-cleaner",
    name: "Vacuum Cleaner",
    image: "/small-appliance/Vacuum_Cleaner.jpg",
    alt: "Sell vacuum cleaner for recycling",
    priceLabel: "₹ 280",
  },
  {
    id: "stabilizer",
    name: "Stabilizer",
    image: "/small-appliance/Stabilizer.jpg",
    alt: "Sell stabilizer for recycling",
    priceLabel: "₹ 200",
  },
]

export const electronicsGadgets: SellProduct[] = [
  {
    id: "laptop",
    name: "Laptop",
    image: "/electronics/Laptop.jpg",
    alt: "Sell laptop for recycling",
    priceLabel: "₹ 800",
  },
  {
    id: "mobile-phone",
    name: "Mobile Phone",
    image: "/electronics/Mobile_Phone.jpg",
    alt: "Sell mobile phone for recycling",
    priceLabel: "₹ 200",
  },
  {
    id: "tablet",
    name: "Tablet",
    image: "/electronics/Tablet.jpg",
    alt: "Sell tablet for recycling",
    priceLabel: "₹ 130",
  },
  {
    id: "cpu",
    name: "CPU",
    image: "/electronics/CPU.png",
    alt: "Sell CPU for recycling",
    priceLabel: "₹ 600",
  },
  {
    id: "printer",
    name: "Printer",
    image: "/electronics/Printer.png",
    alt: "Sell printer for recycling",
    priceLabel: "₹ 100",
  },
]
