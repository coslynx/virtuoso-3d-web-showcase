import { StoreProvider } from './store/useStore';
import { Hero, Carousel, ScrollExperience, Contact } from './slices';

export default function App() {
  return (
    <StoreProvider>
      <Hero
        heading="Immersive 3D Web"
        subheading="Next Generation Experiences"
        body="Create stunning interactive 3D experiences using React, Three.js, and GSAP"
        buttonText="Explore"
        buttonLink="#carousel"
      />

      <Carousel
        heading="3D Model Showcase"
        description="Interactive geometries that respond to your input"
      />

      <ScrollExperience
        heading="Scroll to Transform"
        description="Watch as the geometry morphs and scales with your scroll"
      />

      <Contact
        heading="Let's Create Together"
        description="Ready to build something amazing? Get in touch and let's bring your 3D vision to life."
        buttonText="Start Project"
        email="hello@example.com"
      />
    </StoreProvider>
  );
}
