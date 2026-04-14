import React, { useState } from 'react';
import { Leaf, Calendar, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import roseAndAobImg from './assets/RoseAndAob.jpg';

// --- TYPESCRIPT: INTERFACES ---
// This is where TypeScript shines! We define the exact "shape" of our data.
// If we try to create a service without a price, TypeScript will throw an error.
interface SpaService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
}

interface BookingDetails {
  name: string;
  phone: string;
  date: string;
  time: string;
}

// --- MOCK DATA ---
const services: SpaService[] = [
  { id: '1', name: 'Signature Thai Massage', description: 'A classic full-body massage using gentle, flowing strokes to ease tension and improve circulation.', duration: 60, price: 85 },
  { id: '2', name: 'Deep Tissue Therapy', description: 'Intensive therapy targeting deeper muscle layers to release chronic tension and knots.', duration: 90, price: 120 },
  { id: '3', name: 'Aromatherapy Bliss', description: 'A relaxing massage enhanced with your choice of pure essential oils to balance mind and body.', duration: 60, price: 95 },
  { id: '4', name: 'Hot Stone Renewal', description: 'Smooth, heated stones are placed on key points of the body to melt away stress.', duration: 75, price: 110 },
];

export default function App() {
  // --- TYPESCRIPT: STATE WITH TYPES ---
  // We tell React exactly what type of data these state variables will hold.
  const [selectedService, setSelectedService] = useState<SpaService | null>(null);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    phone: '',
    date: '',
    time: ''
  });

  // --- TYPESCRIPT: EVENT HANDLING ---
  // e: React.ChangeEvent<HTMLInputElement> tells TS this is an input typing event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookNow = (service: SpaService) => {
    if (service.name === 'Signature Thai Massage') {
      setBookingSuccess(true); // reuse your success popup
      return;
    }

    setSelectedService(service);
    setIsBooking(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    // In a real app, you would send formData to a server here.
    console.log('Booking submitted:', { service: selectedService?.name, ...formData });
    setIsBooking(false);
    setBookingSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      setFormData({ name: '', phone: '', date: '', time: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-800">
            <Leaf className="w-8 h-8" />
            <h1 className="text-2xl font-serif font-bold tracking-tight">Na Rose's Spa</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-stone-600">
            <a href="#services" className="hover:text-emerald-700 transition">Services</a>
            <a href="#about" className="hover:text-emerald-700 transition">About Us</a>
            <a href="#contact" className="hover:text-emerald-700 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 py-24 md:py-32 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Find Your Inner Peace</h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Experience holistic rejuvenation with our nature-inspired massage therapies. Reconnect with yourself in our tranquil urban oasis.
          </p>
          <a href="#services" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition shadow-lg">
            <Calendar className="w-5 h-5" />
            Book an Appointment
          </a>
        </div>
      </section>

      {/* SUCCESS TOAST MESSAGE */}
      {bookingSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-emerald-100 text-emerald-800 px-20 py-6 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">
              🎉 Happy Birthday Na Rose! 🎂 Wishing you happiness, relaxation, and wealth! 💖<br /> BTW, I'm the one who took this photo!
            </span>
            <img
              src={roseAndAobImg}
              alt="Birthday picture, too bad it doesn't appear!"
              className="w-40 h-40 object-cover rounded-full shadow-md"
            />
          </div>
        </div> 
      )}

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">Our Therapies</h3>
          <p className="text-stone-600 max-w-2xl mx-auto">Carefully curated treatments designed to heal, restore, and relax your body and mind.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition">{service.name}</h4>
                <span className="text-lg font-medium text-emerald-800">${service.price}</span>
              </div>
              <p className="text-stone-600 mb-6 min-h-[48px]">{service.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-sm text-stone-500 gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration} mins
                </div>
                <button 
                  onClick={() => handleBookNow(service)}
                  className="px-5 py-2 text-sm font-semibold border-2 border-emerald-800 text-emerald-800 rounded-full hover:bg-emerald-800 hover:text-white transition"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING MODAL */}
      {isBooking && selectedService && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 relative">
            <button 
              onClick={() => setIsBooking(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-serif font-bold mb-2">Request Appointment</h3>
            <p className="text-stone-600 mb-6 pb-4 border-b border-stone-100">
              For: <strong className="text-emerald-800">{selectedService.name}</strong> ({selectedService.duration} min)
            </p>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="Happy birthday kub na Rose"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="My mom told me 15/4/2026 is your birthday!"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-stone-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Time</label>
                  <input 
                    type="time" 
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-stone-700"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-emerald-800 text-white rounded-lg py-3 mt-6 font-bold hover:bg-emerald-900 transition shadow-sm"
              >
                Confirm Request
              </button>
              <p className="text-xs text-center text-stone-500 mt-3">Payment is handled in-store. No card required.</p>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="contact" className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 mb-4">
              <Leaf className="w-6 h-6" />
              <h4 className="text-xl font-serif font-bold text-white">Na Rose's Spa</h4>
            </div>
            <p className="text-sm">Bringing nature's healing touch to your everyday life.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Contact Info</h5>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Somewhere in Sydney, Sydney, 12345</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> (66) 987-6543</p>
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Hours</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 8:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}