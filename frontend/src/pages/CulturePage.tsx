import { motion } from "framer-motion";
import handwovenStory from "@/assets/handwoven-story.jpg";

const CulturePage = () => (
  <div className="min-h-screen">
    <div className="bg-primary text-primary-foreground py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Our Heritage</h1>
        <p className="font-body text-primary-foreground/70">The Cultural Significance of Traditional Tamil Attire</p>
      </motion.div>
    </div>

    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.img
        src={handwovenStory}
        alt="Traditional weaving"
        className="w-full rounded-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div className="prose prose-lg max-w-none space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Sacred Saree</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            The saree is far more than a garment in Tamil culture — it is a living symbol of feminine grace, cultural identity, and spiritual devotion. The Kanchipuram silk saree, known as "Kanjeevaram," holds a special place as the queen of all sarees. Woven with pure mulberry silk and real gold or silver zari, each saree is a masterpiece that can take up to a month to create.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mt-4">
            In Tamil tradition, the saree is integral to every life milestone — from the coming-of-age ceremony (Manjal Neerattu Vizha) to weddings, temple worship, and festivals. The colors hold deep meaning: red symbolizes fertility and prosperity, yellow represents auspiciousness, and green denotes new beginnings.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Noble Veshti</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            The veshti (also known as dhoti or vēṭṭi) is the traditional lower garment worn by Tamil men. Made from fine cotton or silk, it is draped around the waist and legs with an art that has been practiced for thousands of years. The white veshti with a gold border (jari) is considered the most formal and is worn during weddings, religious ceremonies, and Pongal celebrations.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mt-4">
            In ancient Tamil literature like the Sangam poems, the veshti is described as a garment of kings and scholars. Even today, no Tamil wedding is complete without the groom wearing a pristine silk veshti with matching angavastram, symbolizing purity, tradition, and respect for ancestral customs.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Graceful Thundu</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            The thundu, or angavastram, is a cloth draped over the shoulder. It serves both practical and ceremonial purposes. During temple visits, it is placed over the shoulder as a mark of respect. In formal gatherings, it adds an element of dignity to the traditional veshti-shirt combination.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mt-4">
            The weaving patterns on the thundu often mirror those found on temple architecture — intricate geometric patterns, lotus motifs, and peacock designs that connect the wearer to the rich artistic traditions of the Chola, Pandya, and Pallava dynasties.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Preserving the Craft</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            At Sri Sudharsana Tex, we work directly with weaver communities in Kanchipuram, Salem, and Madurai to ensure fair wages and the preservation of traditional techniques. Each product is a testament to skills passed down through generations of master weavers, and by choosing handloom, you become part of this living heritage.
          </p>
        </motion.section>
      </div>
    </div>
  </div>
);

export default CulturePage;
