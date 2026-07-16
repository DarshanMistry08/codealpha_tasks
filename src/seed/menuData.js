export const menuData = [
  // ---------- STARTERS ----------
  {
    itemName: "Paneer Tikka",
    description: "Fresh paneer cubes grilled with Indian spices.",
    price: 320,
    category: "Starter",
    available: true,
    preparationTime: 20,
    rating: 4.8,
    isSpecial: true,
    isBestSeller: true,
    isRecommended: true,
    addOns: [
      { name: "Extra Cheese", price: 40 },
      { name: "Extra Mayo", price: 20 }
    ]
  },
  {
    itemName: "Hara Bhara Kabab",
    description: "Spinach and peas patties served with mint chutney.",
    price: 220,
    category: "Starter",
    available: true,
    preparationTime: 15,
    rating: 4.6,
    isRecommended: true,
    addOns: []
  },
  {
    itemName: "Veg Spring Roll",
    description: "Crispy rolls stuffed with vegetables.",
    price: 190,
    category: "Starter",
    available: true,
    preparationTime: 15,
    rating: 4.5,
    addOns: []
  },
  {
    itemName: "Cheese Corn Balls",
    description: "Crispy cheese and corn balls.",
    price: 240,
    category: "Starter",
    available: true,
    preparationTime: 18,
    rating: 4.7,
    isBestSeller: true,
    addOns: []
  },
  {
    itemName: "Masala Papad",
    description: "Roasted papad topped with onions and tomatoes.",
    price: 80,
    category: "Starter",
    available: true,
    preparationTime: 5,
    rating: 4.3,
    addOns: []
  },

  // ---------- MAIN COURSE ----------
  {
    itemName: "Paneer Butter Masala",
    description: "Paneer cubes cooked in rich buttery tomato gravy.",
    price: 340,
    category: "Main Course",
    available: true,
    preparationTime: 25,
    rating: 4.9,
    isBestSeller: true,
    isSpecial: true,
    addOns: [
      { name: "Extra Butter", price: 30 },
      { name: "Extra Paneer", price: 80 }
    ]
  },
  {
    itemName: "Kadai Paneer",
    description: "Paneer cooked with capsicum and onion in kadai masala.",
    price: 330,
    category: "Main Course",
    available: true,
    preparationTime: 22,
    rating: 4.8,
    addOns: []
  },
  {
    itemName: "Shahi Paneer",
    description: "Paneer in creamy cashew gravy.",
    price: 350,
    category: "Main Course",
    available: true,
    preparationTime: 22,
    rating: 4.7,
    addOns: []
  },
  {
    itemName: "Malai Kofta",
    description: "Soft koftas served in rich creamy gravy.",
    price: 340,
    category: "Main Course",
    available: true,
    preparationTime: 25,
    rating: 4.8,
    isRecommended: true,
    addOns: []
  },
  {
    itemName: "Veg Kolhapuri",
    description: "Mixed vegetables in spicy Kolhapuri gravy.",
    price: 310,
    category: "Main Course",
    available: true,
    preparationTime: 22,
    rating: 4.6,
    addOns: []
  },
  {
    itemName: "Dal Tadka",
    description: "Yellow lentils tempered with garlic and spices.",
    price: 220,
    category: "Main Course",
    available: true,
    preparationTime: 18,
    rating: 4.5,
    addOns: []
  },
  {
    itemName: "Dal Fry",
    description: "Rich dal cooked with butter and Indian spices.",
    price: 240,
    category: "Main Course",
    available: true,
    preparationTime: 18,
    rating: 4.6,
    addOns: []
  },
  {
    itemName: "Jeera Rice",
    description: "Basmati rice tempered with cumin.",
    price: 180,
    category: "Main Course",
    available: true,
    preparationTime: 12,
    rating: 4.4,
    addOns: []
  },
  {
    itemName: "Veg Biryani",
    description: "Fragrant basmati rice cooked with vegetables.",
    price: 290,
    category: "Main Course",
    available: true,
    preparationTime: 25,
    rating: 4.8,
    isBestSeller: true,
    addOns: [
      { name: "Extra Raita", price: 25 }
    ]
  },
  {
    itemName: "Hyderabadi Veg Dum Biryani",
    description: "Traditional dum-cooked vegetable biryani.",
    price: 330,
    category: "Main Course",
    available: true,
    preparationTime: 30,
    rating: 4.9,
    isSpecial: true,
    addOns: []
  },

  // ---------- PIZZA ----------
  {
    itemName: "Margherita Pizza",
    description: "Classic cheese pizza.",
    price: 280,
    category: "Pizza",
    available: true,
    preparationTime: 18,
    rating: 4.5,
    addOns: [
      { name: "Extra Cheese", price: 50 },
      { name: "Jalapeno", price: 30 }
    ]
  },
  {
    itemName: "Farmhouse Pizza",
    description: "Loaded with fresh vegetables.",
    price: 420,
    category: "Pizza",
    available: true,
    preparationTime: 22,
    rating: 4.8,
    isBestSeller: true,
    addOns: []
  },

  // ---------- BURGERS ----------
  {
    itemName: "Veg Burger",
    description: "Crispy veg patty with fresh veggies.",
    price: 160,
    category: "Burger",
    available: true,
    preparationTime: 15,
    rating: 4.5,
    addOns: [
      { name: "Cheese Slice", price: 25 }
    ]
  },
  {
    itemName: "Paneer Burger",
    description: "Grilled paneer burger.",
    price: 220,
    category: "Burger",
    available: true,
    preparationTime: 18,
    rating: 4.7,
    addOns: []
  },

  // ---------- GUJARATI ----------
  {
    itemName: "Gujarati Thali",
    description: "Complete traditional Gujarati meal.",
    price: 420,
    category: "Main Course",
    available: true,
    preparationTime: 30,
    rating: 4.9,
    isSpecial: true,
    isBestSeller: true,
    addOns: []
  },
  {
    itemName: "Sev Tameta",
    description: "Traditional Gujarati tomato curry with sev.",
    price: 240,
    category: "Main Course",
    available: true,
    preparationTime: 18,
    rating: 4.7,
    addOns: []
  },
  {
    itemName: "Ringan no Olo",
    description: "Smoky mashed brinjal prepared Gujarati style.",
    price: 250,
    category: "Main Course",
    available: true,
    preparationTime: 20,
    rating: 4.6,
    addOns: []
  },
  {
    itemName: "Undhiyu",
    description: "Seasonal Gujarati mixed vegetable delicacy.",
    price: 340,
    category: "Main Course",
    available: true,
    preparationTime: 35,
    rating: 4.9,
    isSpecial: true,
    addOns: []
  },
  {
    itemName: "Khaman",
    description: "Soft and fluffy Gujarati snack.",
    price: 90,
    category: "Starter",
    available: true,
    preparationTime: 10,
    rating: 4.7,
    addOns: []
  },
  {
    itemName: "Khandvi",
    description: "Soft gram flour rolls with tempering.",
    price: 120,
    category: "Starter",
    available: true,
    preparationTime: 15,
    rating: 4.8,
    addOns: []
  },
  {
    itemName: "Dhokla",
    description: "Steamed fermented gram flour cake.",
    price: 100,
    category: "Starter",
    available: true,
    preparationTime: 10,
    rating: 4.8,
    isBestSeller: true,
    addOns: []
  },
  {
    itemName: "Fafda",
    description: "Traditional Gujarati crispy snack.",
    price: 120,
    category: "Starter",
    available: true,
    preparationTime: 10,
    rating: 4.6,
    addOns: []
  },
  {
    itemName: "Thepla",
    description: "Soft Gujarati flatbread.",
    price: 110,
    category: "Main Course",
    available: true,
    preparationTime: 12,
    rating: 4.7,
    addOns: [
      { name: "Curd", price: 20 }
    ]
  },

  // ---------- DESSERT ----------
  {
    itemName: "Gulab Jamun",
    description: "Soft milk dumplings in sugar syrup.",
    price: 140,
    category: "Dessert",
    available: true,
    preparationTime: 8,
    rating: 4.8,
    addOns: [
      { name: "Vanilla Ice Cream", price: 60 }
    ]
  },
  {
    itemName: "Rasmalai",
    description: "Soft cottage cheese dumplings in sweetened milk.",
    price: 170,
    category: "Dessert",
    available: true,
    preparationTime: 8,
    rating: 4.9,
    addOns: []
  },
  {
    itemName: "Brownie with Ice Cream",
    description: "Chocolate brownie served warm with vanilla ice cream.",
    price: 240,
    category: "Dessert",
    available: true,
    preparationTime: 10,
    rating: 4.8,
    isRecommended: true,
    addOns: []
  },

  // ---------- BEVERAGES ----------
  {
    itemName: "Sweet Lassi",
    description: "Refreshing sweet yogurt drink.",
    price: 110,
    category: "Beverage",
    available: true,
    preparationTime: 5,
    rating: 4.7,
    addOns: []
  },
  {
    itemName: "Masala Chaas",
    description: "Traditional Gujarati spiced buttermilk.",
    price: 60,
    category: "Beverage",
    available: true,
    preparationTime: 3,
    rating: 4.8,
    addOns: []
  },
  {
    itemName: "Cold Coffee",
    description: "Chilled coffee with ice cream.",
    price: 170,
    category: "Beverage",
    available: true,
    preparationTime: 6,
    rating: 4.7,
    addOns: []
  }
];