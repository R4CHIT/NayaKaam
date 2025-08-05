

const getServices = (setPopularServices) => {
  const popularServices = [
      {
        id: 1,
        title: 'AC Repair & Service',
        category: 'appliances',
        rating: 4.8,
        reviews: 1247,
        price: 299,
        originalPrice: 399,
        duration: '45-60 mins',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
        discount: 25,
        isPopular: true,
        features: ['Warranty', 'Insured']
      },
      {
        id: 2,
        title: 'Deep House Cleaning',
        category: 'cleaning',
        rating: 4.9,
        reviews: 2156,
        price: 1999,
        originalPrice: 2499,
        duration: '3-4 hours',
        image: 'https://images.unsplash.com/photo-1581578949510-7a2e0f0e5ccf?w=300&h=200&fit=crop',
        discount: 20,
        isPopular: true,
        features: ['Eco-friendly', 'Insured']
      },
      {
        id: 3,
        title: 'Hair Cut & Styling',
        category: 'beauty',
        rating: 4.7,
        reviews: 892,
        price: 399,
        originalPrice: 499,
        duration: '30-45 mins',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
        discount: 20,
        isPopular: false,
        features: ['Professional', 'Hygienic']
      },
      {
        id: 4,
        title: 'Plumbing Services',
        category: 'repairs',
        rating: 4.6,
        reviews: 654,
        price: 199,
        originalPrice: 299,
        duration: '30-90 mins',
        image: 'https://images.unsplash.com/photo-1581578949510-7a2e0f0e5ccf?w=300&h=200&fit=crop',
        discount: 33,
        isPopular: false,
        features: ['24/7 Available', 'Licensed']
      },
      {
        id: 5,
        title: 'Wall Painting',
        category: 'painting',
        rating: 4.8,
        reviews: 445,
        price: 12,
        originalPrice: 18,
        duration: 'Per sq ft',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=200&fit=crop',
        discount: 33,
        isPopular: true,
        features: ['Asian Paints', 'Warranty']
      },
      {
        id: 6,
        title: 'Laptop Repair',
        category: 'repairs',
        rating: 4.5,
        reviews: 321,
        price: 499,
        originalPrice: 699,
        duration: '1-2 hours',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
        discount: 29,
        isPopular: false,
        features: ['Data Safe', 'Warranty']
      }
    ];
    setPopularServices(popularServices)
}

export default getServices
