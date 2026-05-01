import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useImageLoad } from '../../hooks/useImageLoad';
import { useProximityGlow } from '../../hooks/useProximityGlow';
import './Section.css';

const galleryImages = [
  { src: '/assets/gallery/gallery-1.png', alt: 'Students practicing sitar', span: 'col-2' },
  { src: '/assets/gallery/gallery-2.png', alt: 'Esraj closeup', span: 'col-1' },
  { src: '/assets/gallery/gallery-3.png', alt: 'Dance performance', span: 'col-1' },
  { src: '/assets/gallery/gallery-4.png', alt: 'Archival manuscripts', span: 'col-2' },
  { src: '/assets/gallery/gallery-5.png', alt: 'Heritage courtyard', span: 'col-3' },
];

const GalleryImage = ({ image, index }: { image: typeof galleryImages[0]; index: number }) => {
  const itemRef = useProximityGlow<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  const imgLoaded = useImageLoad(imgRef);

  return (
    <div ref={itemRef} className={`gallery-item ${image.span} reveal-delay-${(index % 3) + 1}`}>
      <div className="image-container" style={{height: '100%'}}>
        <img 
          ref={imgRef}
          src={image.src} 
          alt={image.alt} 
          className={`img-reveal ${imgLoaded ? 'loaded' : ''}`}
        />
      </div>
    </div>
  );
};

const GalleryPreview = () => {
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const gridRef = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="gallery" className="section-padding">
      <div className="container">
        <div ref={headerRef} className="text-center mb-40 reveal">
          <span className="eyebrow">Archival</span>
          <h2>The Visual Archive</h2>
        </div>
        
        <div ref={gridRef} className="gallery-grid reveal">
          {galleryImages.map((img, index) => (
            <GalleryImage key={index} image={img} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
