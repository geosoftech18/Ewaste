'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck, MapPin, ChevronLeft, ChevronRight, PackageOpen, Recycle, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIES, INDIA_MAP_BOUNDS } from '@/data/cities';

const createCityIcon = (isActive: boolean, isCompleted: boolean) => {
  const color = isCompleted ? '#10b981' : isActive ? '#3b82f6' : '#94a3b8';
  const size = isActive ? 16 : 12;

  return L.divIcon({
    className: 'custom-city-marker',
    html: `
      <div aria-hidden="true" style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ${isActive ? 'animation: pulse 2s infinite;' : ''}
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const createTruckIcon = (isMoving: boolean = false) => {
  return L.divIcon({
    className: 'custom-truck-marker',
    html: `
      <div aria-hidden="true" style="
        background-color: #10b981;
        padding: 8px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        ${isMoving ? 'animation: truckBounce 0.8s ease-in-out infinite;' : ''}
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" aria-hidden="true">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
          <path d="M15 18H9"></path>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
          <circle cx="17" cy="18" r="2"></circle>
          <circle cx="7" cy="18" r="2"></circle>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

function MapController() {
  const map = useMap();

  useEffect(() => {
    map.setView(INDIA_MAP_BOUNDS.center, INDIA_MAP_BOUNDS.zoom);
    map.setMinZoom(INDIA_MAP_BOUNDS.minZoom);
    map.setMaxZoom(INDIA_MAP_BOUNDS.maxZoom);
  }, [map]);

  return null;
}

export default function InteractiveIndiaMap() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [completedCities, setCompletedCities] = useState<number[]>([]);
  const [truckPosition, setTruckPosition] = useState<[number, number]>([
    CITIES[0].lat,
    CITIES[0].lng,
  ]);
  const [isTruckMoving, setIsTruckMoving] = useState(false);
  const [totalWasteCollected, setTotalWasteCollected] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [cardsPerView, setCardsPerView] = useState(4);
  const maxCarouselIndex = Math.max(0, CITIES.length - cardsPerView);

  // Function to animate truck movement between cities
  const animateTruckMovement = (fromIndex: number, toIndex: number, duration: number = 2000) => {
    setIsTruckMoving(true);
    const startPos = [CITIES[fromIndex].lat, CITIES[fromIndex].lng] as [number, number];
    const endPos = [CITIES[toIndex].lat, CITIES[toIndex].lng] as [number, number];
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth movement
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedProgress = easeInOutCubic(progress);
      
      const currentLat = startPos[0] + (endPos[0] - startPos[0]) * easedProgress;
      const currentLng = startPos[1] + (endPos[1] - startPos[1]) * easedProgress;
      
      setTruckPosition([currentLat, currentLng]);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsTruckMoving(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 768) {
        setCardsPerView(2);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    const totalCities = CITIES.length;
    const totalDuration = 60000;
    const durationPerCity = totalDuration / totalCities;

    const interval = setInterval(() => {
      setCurrentCityIndex((prev) => {
        const next = (prev + 1) % totalCities;

        if (next === 0) {
          // Reset everything when starting a new cycle
          setCompletedCities([]);
          setTotalWasteCollected(0);
        } else {
          // Only add to completed if we're not at the start of a new cycle
          setCompletedCities((completed) => {
            // Ensure we don't exceed the total number of cities
            const newCompleted = [...completed, prev];
            return newCompleted.length <= totalCities ? newCompleted : completed;
          });
          setTotalWasteCollected((total) => total + CITIES[prev].wasteCollection);
        }

        // Animate truck movement to the next city
        animateTruckMovement(prev, next, 2000);

        if (next >= carouselIndex + cardsPerView || next < carouselIndex) {
          setCarouselIndex(Math.max(0, Math.min(next, maxCarouselIndex)));
        }

        return next;
      });
    }, durationPerCity);

    return () => clearInterval(interval);
  }, [carouselIndex, maxCarouselIndex]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    setCarouselIndex((prev) => {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(maxCarouselIndex, prev + 1);
      }
    });
  };

  const currentCity = CITIES[currentCityIndex];
  const routeCoordinates: [number, number][] = CITIES.map((city) => [city.lat, city.lng]);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-4">
            Live E-Waste Collection Tracking
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time monitoring of our green fleet across {CITIES.length} major Indian cities
          </p>
        </div>

        <div
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-100 bg-white"
          role="region"
          aria-label="Live e-waste collection map across major Indian cities"
        >
          <div className="india-map-spotlight" />
          <MapContainer
            center={INDIA_MAP_BOUNDS.center}
            zoom={INDIA_MAP_BOUNDS.zoom}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
            dragging={true}
            touchZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline
              positions={routeCoordinates}
              color="#10b981"
              weight={3}
              opacity={0.6}
              dashArray="10, 10"
            />

            {CITIES.map((city, index) => {
              const isActive = index === currentCityIndex;
              const isCompleted = index < currentCityIndex;

              return (
                <Marker
                  key={`${city.name}-${index}-${isActive}-${isCompleted}`}
                  position={[city.lat, city.lng]}
                  icon={createCityIcon(isActive, isCompleted)}
                  title={`${city.name} e-waste collection stop`}
                  alt={`${city.name} e-waste collection stop`}
                  eventHandlers={{
                    add: (e) => {
                      const el = (e.target as L.Marker).getElement()
                      if (el) {
                        el.setAttribute('aria-label', `${city.name} e-waste collection stop`)
                        el.setAttribute('role', 'button')
                      }
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <h3 className="font-bold text-lg text-gray-800">{city.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {isCompleted
                          ? '✓ Collection Complete'
                          : isActive
                          ? '🚛 Truck Arriving'
                          : '⏳ Pending'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        E-Waste: {city.wasteCollection} kg
                      </p>
                      <p className="text-xs text-gray-500">
                        Stop {index + 1} of {CITIES.length}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            <Marker
              position={truckPosition}
              icon={createTruckIcon(isTruckMoving)}
              title="E-waste collection truck"
              alt="E-waste collection truck"
              eventHandlers={{
                add: (e) => {
                  const el = (e.target as L.Marker).getElement()
                  if (el) {
                    el.setAttribute('aria-label', 'E-waste collection truck')
                    el.setAttribute('role', 'button')
                  }
                },
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-bold text-lg text-emerald-600">Collection Truck</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isTruckMoving ? '🚛 Moving to next destination...' : `Currently at: ${currentCity.name}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Progress: {currentCityIndex + 1}/{CITIES.length} cities
                  </p>
                  <p className="text-xs text-gray-500">
                    Total Collected: {totalWasteCollected} kg
                  </p>
                </div>
              </Popup>
            </Marker>

            <MapController />
          </MapContainer>

          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white rounded-xl shadow-lg p-3 sm:p-4 z-[500] max-w-[180px] sm:max-w-xs">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-800">Current Location</h3>
                <p className="text-xs sm:text-sm text-emerald-600">
                  {isTruckMoving ? currentCity.name : currentCity.name}
                </p>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-[10px] sm:text-xs text-gray-600">
                <span>Progress</span>
                <span className="font-semibold">
                  {currentCityIndex + 1}/{CITIES.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentCityIndex + 1) / CITIES.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <PackageOpen className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700">E-Waste Collected</span>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-600">
                {totalWasteCollected.toLocaleString()} <span className="text-xs sm:text-sm">kg</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white rounded-xl shadow-lg p-2 sm:p-3 z-[500]">
            <div className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                <span className="text-gray-700">Completed</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                <span className="text-gray-700">Active</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                <span className="text-gray-700">Pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-emerald-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Route Schedule
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                disabled={carouselIndex === 0}
                className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all ${
                  carouselIndex === 0
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {carouselIndex + 1}-{Math.min(carouselIndex + cardsPerView, CITIES.length)} of{' '}
                {CITIES.length}
              </span>
              <button
                onClick={() => scrollCarousel('right')}
                disabled={carouselIndex >= maxCarouselIndex}
                className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all ${
                  carouselIndex >= maxCarouselIndex
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden" style={{ minHeight: '180px' }}>
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{
                transform: `translateX(-${carouselIndex * (100 / cardsPerView)}%)`,
                paddingTop: '20px',
                paddingBottom: '20px'
              }}
            >
              {CITIES.map((city, index) => {
                const isActive = index === currentCityIndex;
                const isCompleted = index < currentCityIndex;

                return (
                  <div
                    key={`${city.name}-card-${index}`}
                    className={`flex-shrink-0 rounded-2xl border-2 transition-all relative overflow-hidden ${
                      isActive
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-white scale-105 shadow-lg'
                        : isCompleted
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    style={{ 
                      width: `calc(${100 / cardsPerView}% - 12px)`, 
                      minHeight: '120px',
                      maxHeight: '140px'
                    }}
                  >
                    {isActive ? (
                      // Full animated content when active - same size as default
                      <div className="p-2 h-full flex flex-col justify-center items-center relative">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-3">
                          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#16A34A_1px,_transparent_1px)] bg-[length:10px_10px]" />
                        </div>

                        {/* Floating e-waste icons */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 0, scale: 1 }}
                              animate={{
                                opacity: [0, 1, 1, 0],
                                y: [0, -8, -16, -24],
                                scale: [1, 1.1, 1, 0.8],
                              }}
                              transition={{
                                duration: 2,
                                delay: 1 + i * 0.3,
                                ease: "easeOut",
                              }}
                              className="text-green-600"
                            >
                              {i === 0 && <PackageOpen className="w-3 h-3" />}
                              {i === 1 && <Recycle className="w-3 h-3" />}
                              {i === 2 && <PackageOpen className="w-3 h-3" />}
                            </motion.div>
                          ))}
                        </div>

                        {/* Animated Truck */}
                        <div className="relative mb-1 h-8 flex items-center justify-center">
                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative"
                          >
                            <Truck className="w-6 h-6 text-green-700" />
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <Recycle className="w-2 h-2 text-white" />
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* City Info */}
                        <div className="text-center relative z-10">
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xs font-bold text-green-700 mb-0.5"
                          >
                            {city.name}
                          </motion.h3>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[10px] text-gray-700 mb-1"
                          >
                            E-Waste: <span className="font-bold text-green-600 text-xs">{city.wasteCollection} kg</span>
                          </motion.div>

                          {/* Collected Badge - only for completed cities */}
                          {/* <AnimatePresence>
                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-700 text-white font-bold rounded-full text-[8px]"
                              >
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
                                  ✅
                                </motion.span>
                                Done
                              </motion.div>
                            )}
                          </AnimatePresence> */}
                        </div>

                        {/* Eco Icons */}
                        <div className="absolute bottom-0.5 left-0.5 flex gap-0.5 opacity-30">
                          <Leaf className="w-1.5 h-1.5 text-green-600" />
                          <Recycle className="w-1.5 h-1.5 text-green-600" />
                          <PackageOpen className="w-1.5 h-1.5 text-green-600" />
                        </div>
                      </div>
                    ) : (
                      // Default simple content when not active
                      <div className="p-2 h-full flex flex-col justify-center items-center text-center">
                        <div
                          className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center font-bold text-xs ${
                            isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {index + 1}
                        </div>
                        
                        <p className="font-semibold text-xs text-gray-800 mb-1">{city.name}</p>
                        
                        <p className="text-[10px] text-gray-600 mb-1">
                          {city.wasteCollection} kg
                        </p>
                        
                        <p className="text-[10px] text-gray-500">
                          {isCompleted ?  <AnimatePresence>
                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-700 text-white font-bold rounded-full text-[8px]"
                              >
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
                                  ✅
                                </motion.span>
                                Done
                              </motion.div>
                            )}
                          </AnimatePresence> : 'Pending'}
                        </p>

                        {/* Collected Badge - only for completed cities */}
                        {/* <AnimatePresence>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-green-700 text-white font-bold rounded-full text-[8px] mt-1"
                            >
                              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
                                ✅
                              </motion.span>
                              Done
                            </motion.div>
                          )}
                        </AnimatePresence> */}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-2 border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <PackageOpen className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              <div className="text-right">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600">
                  {totalWasteCollected.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-gray-500">kg</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">E-Waste Collected</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-2 border-sky-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-600 mb-2">
              {currentCityIndex + 1}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Cities Covered</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-2 border-emerald-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
              {Math.round(((currentCityIndex + 1) / CITIES.length) * 100)}%
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Route Progress</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-2 border-sky-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-600 mb-2">{CITIES.length}</div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Cities</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes truckBounce {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(1deg);
          }
          50% {
            transform: translateY(-4px) rotate(0deg);
          }
          75% {
            transform: translateY(-2px) rotate(-1deg);
          }
        }

        .custom-city-marker,
        .custom-truck-marker {
          background: transparent !important;
          border: none !important;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
        }

        .leaflet-popup-content {
          margin: 8px;
        }

        .india-map-spotlight {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 300;
          background: radial-gradient(
            ellipse 55% 60% at 50% 48%,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.4) 55%,
            rgba(255, 255, 255, 0.75) 75%,
            rgba(255, 255, 255, 0.95) 100%
          );
        }

        .leaflet-container {
          background: #e5e7eb;
        }

        .leaflet-tile-pane {
          filter: contrast(0.9) brightness(1.1);
        }

        .custom-city-marker,
        .custom-truck-marker,
        .leaflet-marker-pane {
          z-index: 400 !important;
        }

        .leaflet-popup-pane {
          z-index: 500 !important;
        }

        .leaflet-control {
          z-index: 600 !important;
        }
      `}</style>
    </section>
  );
}
