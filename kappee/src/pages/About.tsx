import Layout from "@/components/Layout";
import aboutImage from "@/assets/about-coffee.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => (
  <Layout>
    <div className="container-coffee py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden aspect-square"
        >
          <img src={aboutImage} alt="Our coffee shop" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            Our Story
          </h1>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Brew Haven was born in 2018 out of a tiny roasting shed in Portland, Oregon. What started
              as a passion project between two friends has grown into a community of coffee lovers who
              believe that every cup tells a story.
            </p>
            <p>
              We travel to origin countries, building direct relationships with farmers who share our
              commitment to quality and sustainability. Every bean is hand-selected, and every batch
              is roasted in small quantities to ensure peak freshness and flavor.
            </p>
            <p>
              Our mission is simple: make exceptional coffee accessible to everyone. No pretension,
              no gatekeeping — just really good coffee, crafted with care and delivered to your door.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <span className="text-3xl font-heading font-bold text-accent">12+</span>
              <p className="text-sm text-muted-foreground mt-1">Origin Countries</p>
            </div>
            <div>
              <span className="text-3xl font-heading font-bold text-accent">50k+</span>
              <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
            </div>
            <div>
              <span className="text-3xl font-heading font-bold text-accent">100%</span>
              <p className="text-sm text-muted-foreground mt-1">Ethically Sourced</p>
            </div>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wide hover:bg-primary/90 mt-10 transition-colors"
          >
            Shop Our Coffee <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </Layout>
);

export default About;
