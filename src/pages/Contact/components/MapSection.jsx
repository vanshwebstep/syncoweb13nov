import React from 'react';
import { Container } from '../../../components/common/Container';

export function MapSection() {
  // Google Maps embed URL for Samba Soccer Schools London
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=Samba%20Soccer%20Schools%20London%2C%2065-69%20Shelton%20St%2C%20London%20WC2H%209HE%2C%20United%20Kingdom&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <section className="w-full py-10 sm:py-12 lg:py-14 xl:py-16 pt-2 bg-[#FAFBFC]">
      <Container>
        <div className="w-full overflow-hidden  sm:rounded-[20px] shadow-[0_6px_30px_rgba(0,0,0,0.08)] border border-[#E1E2E6] sm:border-2 sm:border-[#DEDDDE] bg-white">
          <iframe
            title="Samba Soccer Schools London Office Location"
            src={mapEmbedUrl}
            className="w-full h-[320px] sm:h-[380px] md:h-[400px] lg:h-[420px] xl:h-[500px] border-0 block"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}

export default MapSection;
