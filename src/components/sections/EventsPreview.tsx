import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageLoad } from '../../hooks/useImageLoad';
import { useProximityGlow } from '../../hooks/useProximityGlow';
import './Section.css';

const events = [
  {
    title: 'Dhrupad Night',
    date: 'Nov 15, 2026',
    time: '6:30 PM',
    location: 'Main Pavilion',
    image: '/assets/events/event-1.png'
  },
  {
    title: 'Monsoon Raga Workshop',
    date: 'July 10, 2026',
    time: '10:00 AM',
    location: 'Heritage Studio',
    image: '/assets/events/event-2.png'
  },
  {
    title: 'Annual Convocation',
    date: 'Dec 20, 2026',
    time: '5:00 PM',
    location: 'City Cultural Center',
    image: '/assets/events/event-3.png'
  }
];

const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const cardRef = useProximityGlow<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  return (
    <div ref={cardRef} className={`program-card reveal-delay-${index + 1}`}>
      <div className="program-image image-container" style={{height: '300px'}}>
        <img 
          ref={imgRef}
          src={event.image} 
          alt={event.title} 
          className={`img-reveal ${imgLoaded ? 'loaded' : ''}`}
        />
      </div>
      <div className="program-content">
        <span className="eyebrow" style={{marginBottom: '8px'}}>{event.date} • {event.time}</span>
        <h3 style={{fontSize: '20px'}}>{event.title}</h3>
        <p style={{fontSize: '14px', marginBottom: '16px'}}>{event.location}</p>
        <a href="#register" className="btn btn-tertiary">Register Interest →</a>
      </div>
    </div>
  );
};

const EventsPreview = () => {
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const gridRef = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section id="events" className="section-padding bg-warm">
      <div className="container">
        <div ref={headerRef} className="text-center mb-40 reveal">
          <span className="eyebrow">Seasonal</span>
          <h2>Upcoming Events</h2>
        </div>
        
        <div ref={gridRef} className="programs-grid reveal">
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
