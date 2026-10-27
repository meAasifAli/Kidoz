// Kidoz Kids Fashion - Product Catalog Data
// Inspired by @kidozkidsfashion

const STORE_CONFIG = {
  storeName: "Kidoz Kids Fashion",
  instagramHandle: "@kidozkidsfashion",
  instagramUrl: "https://www.instagram.com/kidozkidsfashion?utm_source=qr&exln=YjMzd2YyMmszd2Iz",
  whatsappNumber: "919891138821", // Actual number from Instagram profile
  whatsappDisplayNumber: "+91 98911 38821",
  currency: "₹",
  freeShippingThreshold: 999
};

const PRODUCTS = [
  {
    id: 1,
    name: "Summer Floral Breeze Layered Frock",
    category: "girls",
    tag: "Bestseller",
    price: 899,
    originalPrice: 1499,
    discount: "40% OFF",
    rating: 4.9,
    reviews: 142,
    sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    colors: ["Blush Pink", "Lilac Breeze", "Sunny Yellow"],
    fabric: "100% Breathable Organic Cotton with soft lining",
    description: "Delightful layered ruffle frock featuring sweet pastel floral prints. Feather-light, gentle on sensitive skin, and pre-washed to avoid shrinkage. Ideal for day outings & birthday parties.",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    name: "Dapper Linen Shirt & Bermuda Shorts Set",
    category: "boys",
    tag: "Trending",
    price: 999,
    originalPrice: 1699,
    discount: "41% OFF",
    rating: 4.8,
    reviews: 98,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Olive Green", "Beige Sand", "Sky Blue"],
    fabric: "Premium Cotton Linen Blend (Non-itchy)",
    description: "Classic collar casual shirt paired with comfortable elastic-waist Bermuda shorts with functional pockets. Effortlessly stylish for family gatherings and sunny playdates.",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    name: "Safari Explorer Cotton Co-ord Set",
    category: "coord-sets",
    tag: "Hot Seller",
    price: 799,
    originalPrice: 1299,
    discount: "38% OFF",
    rating: 5.0,
    reviews: 84,
    sizes: ["6-12M", "1-2Y", "2-3Y", "3-4Y"],
    colors: ["Terracotta", "Sage Green", "Mustard"],
    fabric: "Waffle Knit 100% Bio-Wash Cotton",
    description: "Unisex cozy co-ord set with cute wooden button details. Super stretchy, ultra-soft and allows full mobility for active toddlers.",
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    name: "Royal Festive Kurta & Dhoti Pant Set",
    category: "festive",
    tag: "Festive Special",
    price: 1299,
    originalPrice: 2199,
    discount: "41% OFF",
    rating: 4.9,
    reviews: 110,
    sizes: ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
    colors: ["Mustard Yellow", "Royal Blue", "Emerald Green"],
    fabric: "Silk-Cotton Blend with Breathable Soft Voile Inner Lining",
    description: "Traditional printed kurta adorned with subtle foil accents and pre-stitched hassle-free elasticated dhoti pants. Zero itchiness, designed keeping energetic kids in mind.",
    images: [
      "https://images.unsplash.com/photo-1607453998774-d533f65adc99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    name: "Candy Stripe Dungaree & Tee Combo",
    category: "boys",
    tag: "New Arrival",
    price: 1049,
    originalPrice: 1799,
    discount: "42% OFF",
    rating: 4.7,
    reviews: 63,
    sizes: ["6-12M", "1-2Y", "2-3Y", "3-4Y"],
    colors: ["Denim Blue", "Soft Mint", "Carmel Brown"],
    fabric: "Soft Twill Denim & Combed Cotton Tee",
    description: "Adorable dungaree set featuring adjustable shoulder straps, cute embroidered front pocket, and snap button crotch for easy diaper changes.",
    images: [
      "https://images.unsplash.com/photo-1543854538-89c894982635?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 6,
    name: "Princess Twirl Sparkle Tulle Gown",
    category: "girls",
    tag: "Party Wear",
    price: 1399,
    originalPrice: 2499,
    discount: "44% OFF",
    rating: 5.0,
    reviews: 167,
    sizes: ["2-3Y", "3-4Y", "5-6Y", "7-8Y"],
    colors: ["Pastel Lavender", "Sky Aqua", "Rose Quartz"],
    fabric: "Multi-layered Soft Tulle with 100% Pure Cotton Under-slip",
    description: "Make her feel like royalty with this premium party gown. Features a delicate pearl bodice, tiered flare skirt with maximum twirl factor, and a zip-free comfy fit.",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 7,
    name: "Ultra-Soft Newborn Baby Romper Trio",
    category: "infants",
    tag: "Must Have",
    price: 849,
    originalPrice: 1399,
    discount: "39% OFF",
    rating: 4.9,
    reviews: 195,
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M"],
    colors: ["Pastel Pastel Multi", "Ocean Mist", "Sweet Blossom"],
    fabric: "100% GOTS Certified Organic Cotton",
    description: "Pack of 3 super snug rompers with nickel-free two-way snaps for quick, zero-fuss changes. Non-toxic organic dyes ensure newborn delicate skin stays rash-free.",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 8,
    name: "Boho Chic Printed Tiered Top & Pant Set",
    category: "coord-sets",
    tag: "Trending",
    price: 949,
    originalPrice: 1599,
    discount: "40% OFF",
    rating: 4.8,
    reviews: 74,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    colors: ["Sunny Mustard", "Coral Peach", "Teal Charm"],
    fabric: "Soft Muslin Rayon Cotton",
    description: "A breezy ethnic-fusion co-ord set with tassels and subtle mirror lace trimming. Light as air, perfect for casual outings or festive get-togethers.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 9,
    name: "Smart Casual Polo & Chino Pants Duo",
    category: "boys",
    tag: "Popular",
    price: 1149,
    originalPrice: 1899,
    discount: "39% OFF",
    rating: 4.7,
    reviews: 86,
    sizes: ["3-4Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Navy / Khaki", "Burgundy / Grey", "Forest / Tan"],
    fabric: "Premium Honeycomb Pique Cotton + Stretch Cotton Chino",
    description: "Upgrade his wardrobe with this sleek semi-formal combination. Classic tipping collar polo with stretchable tailored chino pants featuring an adjustable inner waistband.",
    images: [
      "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 10,
    name: "Pastel Unicorn Fantasy Party Dress",
    category: "girls",
    tag: "Client Favorite",
    price: 1199,
    originalPrice: 1999,
    discount: "40% OFF",
    rating: 4.9,
    reviews: 133,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "6-7Y"],
    colors: ["Pastel Rainbow", "Cotton Candy", "Lilac Spark"],
    fabric: "Soft Jacquard Satin with Featherlight Gauze Flare",
    description: "The dream dress for every little girl! Gorgeous rainbow pastel ombré detailing, lightweight sash bow, and smooth anti-chafing cotton lining.",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 11,
    name: "Snuggly Bear Hooded Fleece Romper",
    category: "infants",
    tag: "Winter Warmth",
    price: 999,
    originalPrice: 1699,
    discount: "41% OFF",
    rating: 5.0,
    reviews: 215,
    sizes: ["0-6M", "6-12M", "12-18M"],
    colors: ["Teddy Brown", "Polar Cream", "Misty Grey"],
    fabric: "Sherpa Fleece Outer & 100% Interlock Cotton Inner",
    description: "Keep your tiny bundle cozy and warm with 3D bear ears, covered feet, and double full-length zipper for effortless dressing during chilly mornings.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 12,
    name: "Festive Embroidered Lehenga Choli Set",
    category: "festive",
    tag: "Festive Grandeur",
    price: 1599,
    originalPrice: 2799,
    discount: "43% OFF",
    rating: 4.9,
    reviews: 154,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    colors: ["Magenta Pink", "Marigold Yellow", "Teal Green"],
    fabric: "Art Silk Brocade with Pure Cotton Comfort Lining",
    description: "Dazzling handcrafted kidswear lehenga with comfortable elasticated waistband, easy latkan tie-up, and featherweight organza dupatta. Perfect for weddings & festive ceremonies.",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607453998774-d533f65adc99?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const LOOKBOOK_ITEMS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
    caption: "Breeze into summer with pastel twirl frocks ✨ #KidozFashion",
    likes: 420
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80",
    caption: "Little gentleman in our linen summer co-ord! 🌿 #LittleBoss",
    likes: 615
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
    caption: "Waffle knit everyday sets loved by 500+ toddlers 💛",
    likes: 388
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1607453998774-d533f65adc99?auto=format&fit=crop&w=600&q=80",
    caption: "Festive smiles with zero irritation fabric guarantee! 🪔 #FestiveKidoz",
    likes: 890
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    caption: "Fairytale vibes for her special birthday celebration 🌸👑",
    likes: 742
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    caption: "Newborn softness in organic GOTS cotton onesies ☁️",
    likes: 531
  }
];
