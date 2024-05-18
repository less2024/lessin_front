import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { faker } from '@faker-js/faker';

const boxVariant = {
    visible:{
      opacity:1,
      y:0,
      transition:{
        duration:0.3
      }
    },
    hidden:{
      opacity:0,
      y:80
    },
};

const Test = ({children}) => {

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      //key={faker.string.uuid()}
    >
    {children}
    </motion.div>
  );
};

export default Test;